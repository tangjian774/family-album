// app/page.tsx
import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/LoginForm";
import { Card } from "@/components/ui/card";

// 模拟照片数据
const mockPhotos = [
  { id: 1, title: "第一次叫爸爸", url: "https://picsum.photos/400/300?random=1" },
  { id: 2, title: "周末去公园", url: "https://picsum.photos/400/500?random=2" },
  { id: 3, title: "生日蛋糕", url: "https://picsum.photos/400/400?random=3" },
  { id: 4, title: "学走路", url: "https://picsum.photos/400/350?random=4" },
  { id: 5, title: "第一次游泳", url: "https://picsum.photos/400/450?random=5" },
  { id: 6, title: "全家福", url: "https://picsum.photos/400/300?random=6" },
];

export default async function HomePage() {
  // 服务端判断登录状态
  const session = await auth();

  // 未登录：直接显示登录页
  if (!session?.user) {
    return <LoginForm />;
  }

  // 已登录：显示相册
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">家庭相册</h1>
      
      {/* 照片瀑布流 */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {mockPhotos.map((photo) => (
          <div key={photo.id} className="break-inside-avoid">
            <Card className="overflow-hidden">
              <img 
                src={photo.url} 
                alt={photo.title} 
                className="w-full object-cover"
              />
              <div className="p-4">
                <p className="font-medium text-slate-800">{photo.title}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}