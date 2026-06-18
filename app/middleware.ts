import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Token ကို Cookie သို့မဟုတ် Header မှ ဖတ်ပါ
  const token = request.cookies.get('token')?.value || request.headers.get('authorization')?.split(' ')[1];
  
  // 2. Dashboard နေရာများကို ခွဲခြားခြင်း
  const url = request.nextUrl.pathname;
  
  // Login မဝင်ရသေးရင် login စာမျက်နှာကို ပို့ပေးမယ်
  if (!token && (url.startsWith('/home/dashboard'))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // အရေးကြီး: Middleware ထဲမှာ localStorage ကို တိုက်ရိုက်မရပါ (Cookie သုံးဖို့ လိုပါတယ်)
  // ထို့ကြောင့် token ကို cookie ထဲမှာ သိမ်းဖို့ အကြံပြုလိုပါသည်။
  
  return NextResponse.next();
}

// ဘယ် URL တွေမှာ middleware အလုပ်လုပ်မလဲဆိုတာ သတ်မှတ်ခြင်း
export const config = {
  matcher: ['/home/dashboard/:path*'],
};