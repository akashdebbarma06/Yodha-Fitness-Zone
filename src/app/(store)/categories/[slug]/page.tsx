export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <main className="p-8">Category: {slug}</main>;
}
