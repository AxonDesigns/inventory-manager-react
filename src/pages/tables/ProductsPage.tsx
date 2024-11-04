import useSWR from 'swr';
import axios from 'axios';
import { useSession } from '@/hooks/useSession';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function ProductsPage() {
  const { data: posts } = useSWR("/posts", async (url: string) => {
    const response = await axios.get(url, { baseURL: "https://jsonplaceholder.typicode.com" });
    return await response.data as Post[];
  }, { suspense: true });

  return (
    <div className='mx-8 mt-4 animate-fade-in-up duration-200 ease-out-slow'>
      <h1 className='text-5xl font-bold mb-4 font-jetbrains-mono'>Products</h1>
      <ul className='list-disc space-y-2 ml-4'>
        {posts.map((post) => (
          <li key={post.id} className='text-zinc-600'>
            <span className='text-foreground'>{post.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductsPage