import {NextResponse} from "next/server";
import {createClient} from "@/lib/supabase/server";

export async function GET(request) {
    const supabase = await createClient();

    const {data: {user}, error: authError} = await supabase.auth.getUser();

    if (authError || !user) {
        const authHeader = request.headers.get('authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7)
            const { data: { user: tokenUser }, error: tokenError } =
                await supabase.auth.getUser(token)

            if (tokenError && !tokenUser) {
                return NextResponse.json({error: 'Unauthorized'}, {status: 401});
            }
        }
    }

    const {searchParams} = new URL(request.url)
    const organizationId = searchParams.get('organizationId')

    if (!organizationId) {
        return NextResponse.json({error: 'organizationId is required'}, {status: 400})
    }

    const {data, error} = await supabase
        .from('categories')
        .select('*, parent: categories (id, name)')
        .eq('organization_id', organizationId)
        .order('sort_order', {ascending: true});

    if (error) {
        return NextResponse.json({error: error.message}, {status: 400})
    }

    return NextResponse.json(data)
}

export async function POST(request) {
    const supabase = await createClient()
    const {data: {user}, error: authError} = await supabase.auth.getUser();

    if (authError || !user) {
        const authHeader = request.headers.get('authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            const { data: { user: tokenUser }, error: tokenError } = await supabase.auth.getUser(token);

            if (tokenError && !tokenUser) {
                return NextResponse.json({error: 'Unauthorized'}, {status: 401});
            }
        }
    }

    const body = await request.json();

    if (!body.organization_id || !body.name) {
        return NextResponse.json({error: 'organization_id and name are required'}, {status: 400})
    }

    const {data, error} = await supabase
        .from('categories')
        .insert({
            organization_id: body.organization_id,
            name: body.name,
            description: body.description || null,
            parent_id: body.parent_id || null,
            image_url: body.image_url || null,
            is_active: body.is_active ?? true,
            sort_order: body.sort_order ?? 0
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating category:', error);
        return NextResponse.json({error: error.message}, {status: 400});
    }

    return NextResponse.json(data, {status: 201});
}
