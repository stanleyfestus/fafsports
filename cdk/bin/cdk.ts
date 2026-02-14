#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BackendStack } from '../lib/backendstack';
import { FrontendStack } from '../lib/frontendstack';
import * as dotenv from 'dotenv';
dotenv.config();

const env: cdk.Environment = {
  region: 'eu-central-1',
  account: process.env.CDK_DEFAULT_ACCOUNT || process.env.AWS_ACCOUNT_ID,
}

const app = new cdk.App();

new BackendStack(app, 'BackendStack', { env 
});

new FrontendStack(app, 'FrontendStack', { 
  env,
  domainName: process.env.DOMAIN_NAME || 'default.domain.com'
});