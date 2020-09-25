resource "aws_security_group" "eks_cluster_sg_eks_demo" {
    name        = "eks_cluster_sg_eks_demo"
    description = "EKS created security group applied to ENI that is attached to EKS Control Plane master nodes, as well as any managed workloads."
    vpc_id      = "${aws_vpc.vpc_eks_demo.id}"

    ingress {
        from_port       = 0
        to_port         = 0
        protocol        = "-1"
        cidr_blocks     = ["0.0.0.0/0"]
        ipv6_cidr_blocks     = ["::/0"]
    }


    egress {
        from_port       = 0
        to_port         = 0
        protocol        = "-1"
        cidr_blocks     = ["0.0.0.0/0"]
        ipv6_cidr_blocks     = ["::/0"]
    }

    tags = map(
        "Name", "eks_cluster_sg_eks_demo",
        "kubernetes.io/cluster/${var.cluster_name}", "owned",
    )
}


