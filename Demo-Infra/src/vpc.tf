resource "aws_vpc" "vpc_eks_demo" {
    cidr_block           = "10.0.0.0/16"
    enable_dns_hostnames = false
    enable_dns_support   = true
    instance_tenancy     = "default"

    tags = map(
        "Name", "eks-demo-node",
        "kubernetes.io/cluster/${var.cluster_name}", "shared",
    )
}



