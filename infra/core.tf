# Local for getting the name of the workspace
locals {
  core_remote_workspace = {
    production = "leaderbordle-production"
  }[var.workspace]
}

# Looks up remote state for the given workspace
data "terraform_remote_state" "core" {
  backend = "remote"

  config = {
    organization = "JKS"
    hostname     = "app.terraform.io"

    workspaces = {
      name = local.core_remote_workspace
    }
  }
}

# Locals that pertain to information known only after applies
locals {
  subnet_ids = {
    app = data.terraform_remote_state.core.outputs.app_subnet_ids
    db  = data.terraform_remote_state.core.outputs.db_subnet_ids
    dmz = data.terraform_remote_state.core.outputs.dmz_subnet_ids
  }

  subnet_cidrs = {
    app = data.terraform_remote_state.core.outputs.app_subnet_cidrs
    db  = data.terraform_remote_state.core.outputs.db_subnet_cidrs
    dmz = data.terraform_remote_state.core.outputs.dmz_subnet_cidrs
  }

  vpc_id     = data.terraform_remote_state.core.outputs.vpc_id
}