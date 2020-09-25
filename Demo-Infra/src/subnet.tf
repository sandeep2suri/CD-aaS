resource "aws_subnet" "eks_demo_sn" {
  count = 2

  availability_zone = data.aws_availability_zones.available.names[count.index]
  cidr_block        = "10.0.${count.index}.0/24"
  vpc_id            = aws_vpc.vpc_eks_demo.id

  tags = map(
    "Name", "eks-demo-sn",
    "kubernetes.io/cluster/${var.cluster_name}", "shared",
  )
}

resource "aws_internet_gateway" "eks_demo_ig" {
  vpc_id = aws_vpc.vpc_eks_demo.id

  tags = {
    Name = "eks_demo_ig"
  }
}

resource "aws_route_table" "eks_demo_route_table" {
  vpc_id = aws_vpc.vpc_eks_demo.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.eks_demo_ig.id
  }
}

resource "aws_route_table_association" "eks_demo_route_table_asso" {
  count = 2

  subnet_id      = aws_subnet.eks_demo_sn.*.id[count.index]
  route_table_id = aws_route_table.eks_demo_route_table.id
}


