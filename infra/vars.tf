provider "aws" {
  region = var.aws_region

  allowed_account_ids = [local.account_id]
}

variable "workspace" {
  type = string
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}