terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "JKS"

    workspaces {
      prefix = "leaderbordle-"
    }
  }
}
