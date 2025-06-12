#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BackendStack } from '../lib/cdk-stack';
import * as dotenv from 'dotenv';
dotenv.config();

const env: cdk.Environment = {
  region: 'eu-west-1',
  account: process.env.CDK_DEFAULT_ACCOUNT || process.env.AWS_ACCOUNT_ID,
}

const app = new cdk.App();
new BackendStack(app, 'BackendStack', { env 
});