output "vpc_id" {
  value = aws_vpc.vpc.id
}

output "vpc_cidr" {
  value = aws_vpc.vpc.cidr_block
}

# DMZ subnets info
output "dmz_subnet_cidrs" {
  value = aws_subnet.dmz.*.cidr_block
}

output "dmz_subnet_ids" {
  value = aws_subnet.dmz.*.id
}

# App subnets info
output "app_subnet_cidrs" {
  value = aws_subnet.app.*.cidr_block
}

output "app_subnet_ids" {
  value = aws_subnet.app.*.id
}

# DB/private subnets info
output "db_subnet_cidrs" {
  value = aws_subnet.db.*.cidr_block
}

output "db_subnet_ids" {
  value = aws_subnet.db.*.id
}

output "nat_gateway_public_ips" {
  value = aws_nat_gateway.ngw.*.public_ip
}

output "dmz_route_table_id" {
  value = aws_route_table.pub.id
}

output "priv_route_table_ids" {
  value = aws_route_table.priv.*.id
}

data "aws_caller_identity" "current" {}

output "account_id" {
  value = data.aws_caller_identity.current.account_id
}

output "caller_arn" {
  value = data.aws_caller_identity.current.arn
}

output "caller_user" {
  value = data.aws_caller_identity.current.user_id
}