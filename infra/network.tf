data "aws_availability_zones" "available" {}


locals {
  vpc_cidr = "10.0.0.0/22"
  az_count = 1
}


# VPC
resource "aws_vpc" "vpc" {
  cidr_block           = local.vpc_cidr
  enable_dns_hostnames = "true" # Allows VPC to assign public DNS hostnames to instances w/ public IPs
}

# Internet Gateway associated with our vpc
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.vpc.id
}

# Elastic IP for NAT Gateway (required for NAT Gateways)
# resource "aws_eip" "ngw" {
#   vpc = true
# }

# # NAT Gateway
# resource "aws_nat_gateway" "ngw" {
#   count = local.az_count

#   allocation_id = element(aws_eip.ngw.*.id, count.index)    # Elastic IP
#   subnet_id     = element(aws_subnet.dmz.*.id, count.index) # NAT Gateways must exist in a public subnet
#   depends_on    = [aws_internet_gateway.igw]
# }

# Public Route Table
resource "aws_route_table" "pub" {
  vpc_id = aws_vpc.vpc.id
}

# Route all non-local traffic to the internet gateway
resource "aws_route" "pub_default_gateway" {
  route_table_id         = aws_route_table.pub.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.igw.id
}

# # Private route table
# resource "aws_route_table" "priv" {
#   vpc_id = aws_vpc.vpc.id
# }

# # Route all non-local traffic to NAT Gateway
# resource "aws_route" "priv_default_gateway" {
#   count                  = local.az_count
#   destination_cidr_block = "0.0.0.0/0"
#   route_table_id         = element(aws_route_table.priv.*.id, count.index)
#   nat_gateway_id         = element(aws_nat_gateway.ngw.*.id, 0)
# }

# DMZ subnet
resource "aws_subnet" "dmz" {
  count = local.az_count

  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = cidrsubnet(local.vpc_cidr, 4, count.index)
  availability_zone       = element(data.aws_availability_zones.available.names, count.index)
  map_public_ip_on_launch = true
}

# Have to associate a route table with a subnet
resource "aws_route_table_association" "pub_dmz" {
  count = local.az_count

  subnet_id      = element(aws_subnet.dmz.*.id, count.index)
  route_table_id = aws_route_table.pub.id
}

# DB Subnet
# resource "aws_subnet" "db" {
#   count = local.az_count

#   vpc_id                  = aws_vpc.vpc.id
#   cidr_block              = cidrsubnet(local.vpc_cidr, 4, 4 + count.index)
#   availability_zone       = element(data.aws_availability_zones.available.names, count.index)
#   map_public_ip_on_launch = false

# }

# resource "aws_route_table_association" "priv_db" {
#   count = local.az_count

#   subnet_id      = element(aws_subnet.db.*.id, count.index)
#   route_table_id = element(aws_route_table.priv.*.id, count.index)
# }

# # App Subnet
# resource "aws_subnet" "app" {
#   count = local.az_count

#   vpc_id                  = aws_vpc.vpc.id
#   cidr_block              = cidrsubnet(local.vpc_cidr, 3, 4 + count.index)
#   availability_zone       = element(data.aws_availability_zones.available.names, count.index)
#   map_public_ip_on_launch = false
# }

# resource "aws_route_table_association" "priv_app" {
#   count = local.az_count

#   subnet_id      = element(aws_subnet.app.*.id, count.index)
#   route_table_id = element(aws_route_table.priv.*.id, count.index)
# }