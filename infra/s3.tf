# Stores public assets
resource "aws_s3_bucket" "web_assets" {
  bucket = "${var.project}-web-assets-bucket"
}

resource "aws_s3_bucket_versioning" "versioning_example" {
  bucket = aws_s3_bucket.web_assets.id
  versioning_configuration {
    status = "Enabled"
  }
}