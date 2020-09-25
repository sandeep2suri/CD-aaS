variable "cluster_name" {
  default = "eks-demo"
  type    = "string"
}

resource "aws_eks_cluster" "eks_demo" {
  name = "${var.cluster_name}"
  role_arn = "${aws_iam_role.eks_demo_iam.arn}"

  vpc_config {
    security_group_ids = [aws_security_group.eks_cluster_sg_eks_demo.id]
    subnet_ids = aws_subnet.eks_demo_sn[*].id
  }
  
  depends_on = [
    "aws_iam_role_policy_attachment.eks_demo_cluster_policy",
    "aws_iam_role_policy_attachment.eks_demo_service_policy",
    "aws_cloudwatch_log_group.eks_demo_log_group",
  ]
  
  enabled_cluster_log_types = ["api", "audit"]
}

resource "aws_cloudwatch_log_group" "eks_demo_log_group" {
  name              = "/aws/eks/${var.cluster_name}/cluster"
  retention_in_days = 7
}

