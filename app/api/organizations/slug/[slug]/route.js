import {createClient} from "@/lib/supabase/server";
import {NextResponse} from "next/server";

export async function GET(request, {params}) {
    const supabase = await createClient();
    const {slug} = await params;

    const {data: {user}, error: authError} = await supabase.auth.getUser();

    if (authError || !user) {
        const authHeader = request.headers.get('authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            const { data: { user: tokenUser }, error: tokenError } =
                await supabase.auth.getUser(token);

            if (tokenError && !tokenUser) {
                return NextResponse.json({error: 'Unauthorized'}, {status: 401});
            }
        }
    }

    const {data: organization, error} = await supabase
        .from('organizations')
        .select('*')
        .eq('slug', slug)
        .limit(1)
        .single();

    console.log(organization);

    if (error) {
        console.error('Error fetching organization:', error);
        return NextResponse.json({error: error.message}, {status: 400});
    }

    return NextResponse.json(organization);
}