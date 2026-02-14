import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";

interface FrontendStackProps extends cdk.StackProps {
  domainName: string
}

export class FrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, { domainName, ...props }: FrontendStackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'FrontendBucket', {
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: true,
        blockPublicPolicy: false,
        ignorePublicAcls: true,
        restrictPublicBuckets: false
      }),
      autoDeleteObjects: true
    });

    bucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [bucket.arnForObjects('*')],
      principals: [new iam.AnyPrincipal()],
    }));

    new BucketDeployment(this, 'DeployFrontend', {
      destinationBucket: bucket,
      sources: [Source.asset('../front/dist')]
    });
  }
}