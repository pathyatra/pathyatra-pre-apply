import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// This route runs ONLY on the server. The service-role key and admin password
// are read from server-side env vars and are never sent to the browser.
export const dynamic = "force-dynamic";

export async function GET(request) {
  const provided = request.headers.get("x-admin-password") || "";
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json(
      { error: "Server not configured: ADMIN_PASSWORD is missing." },
      { status: 500 }
    );
  }
  if (provided !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return NextResponse.json(
      { error: "Server not configured: Supabase env vars missing." },
      { status: 500 }
    );
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from("pre_applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ applications: data });
}
