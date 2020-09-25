provider "aws" {
  region  = "us-east-2"
  version 			= ">= 2.38.0"
  shared_credentials_file 	= "/home/nfs/ssuri/.aws/credentials"
  profile                	= "eks-playground"
}

# Using these data sources allows the configuration to be
# generic for any region.
data "aws_region" "current" {}

data "aws_availability_zones" "available" {}

