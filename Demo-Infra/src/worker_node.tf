resource "aws_eks_node_group" "eks_demo_node_group" {
  cluster_name    = aws_eks_cluster.eks_demo.name
  node_group_name = "eks_demo_node_group"
  node_role_arn   = aws_iam_role.eks_demo_node_group_iam.arn
  subnet_ids      = aws_subnet.eks_demo_sn[*].id

  scaling_config {
    desired_size = 2
    max_size     = 3
    min_size     = 2
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_demo_node_group_worker_node_policy,
    aws_iam_role_policy_attachment.eks_demo_node_group_cni_policy,
    aws_iam_role_policy_attachment.eks_demo_node_group_ec2_container_registry_read_only,
  ]
}

resource "aws_iam_role" "eks_demo_node_group_iam" {
  name = "eks_demo_node_group_iam"

  assume_role_policy = jsonencode({
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
    Version = "2012-10-17"
  })
}

resource "aws_iam_role_policy_attachment" "eks_demo_node_group_worker_node_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.eks_demo_node_group_iam.name
}

resource "aws_iam_role_policy_attachment" "eks_demo_node_group_cni_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = aws_iam_role.eks_demo_node_group_iam.name
}

resource "aws_iam_role_policy_attachment" "eks_demo_node_group_ec2_container_registry_read_only" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.eks_demo_node_group_iam.name
}


