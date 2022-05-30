provider "aws" {
  region              = var.aws_region
  allowed_account_ids = local.account_id[var.workspace]

  default_tags {
    tags = {
      Environment = var.workspace
      Owner       = "Kelton Williams"
      Project     = "leaderbordle"
    }
  }
}

variable "workspace" {
  type = string
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "project" {
  type    = string
  default = "leaderbordle"
}

variable "owner" {
  type    = string
  default = "Kelton Williams"
}

# Locals
locals {
  account_id = {
    production = "637887869310"
  }
}