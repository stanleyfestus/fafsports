import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr_assets from 'aws-cdk-lib/aws-ecr-assets';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as iam from 'aws-cdk-lib/aws-iam';
import path = require('path');
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'SpringBootVpc', { maxAzs: 2 });

    const cluster = new ecs.Cluster(this, 'SpringBootCluster', {
      vpc,
    });

    const dockerImage = new ecr_assets.DockerImageAsset(this, 'SpringBootDockerImage', {
      directory: path.join(__dirname, '../../.devcontainer'),
    })

    const ecsTaskRole = new iam.Role(this, 'SpringBootTaskRole', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
    })

    // Add permissions (example: full access to DynamoDB and S3)
    ecsTaskRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'));
    ecsTaskRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));

    new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'SpringBootService', {
      cluster,
      cpu: 512,
      memoryLimitMiB: 1024,
      desiredCount: 1,
      publicLoadBalancer: true,
      taskImageOptions: {
        image: ecs.ContainerImage.fromDockerImageAsset(dockerImage),
        containerPort: 8080,
        taskRole: ecsTaskRole,
        environment: {
          // SPRING_PROFILES_ACTIVE: 'prod',
          // SPRING_DATASOURCE_URL: 'jdbc:mysql://<your-rds-endpoint>:3306/<your-database>',
          // SPRING_DATASOURCE_USERNAME: '<your-username>',
          // SPRING_DATASOURCE_PASSWORD: '<your-password>',
        },
      },
    })
  }
}
