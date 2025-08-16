import {createClient} from '@/lib/supabase/server'
import {NextResponse} from "next/server";

export async function GET(request, {params}) {
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

    const {data, error} = await supabase
        .from('categories')
        .select('*')
        .eq('id', params.id)
        .single()

    if (error) {
        return NextResponse.json({error: error.message}, {status: 404})
    }

    return NextResponse.json(data);
}

export async function PUT(request, {params}) {
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

    const body = await request.json();

    const {data, error} = await supabase
        .from('categories')
        .update({
            name: body.name,
            description: body.description,
            parent_id: body.parent_id,
            image_url: body.image_url,
            is_active: body.is_active,
            sort_order: body.sort_order,
            updated_at: new Date().toISOString()
        })
        .eq('id', params.id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({error: error.message}, {status: 400})
    }

    return NextResponse.json(data)
}

export async function DELETE(request, {params}) {
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

    const {error} = await supabase
        .from('categories')
        .delete()
        .eq('id', params.id)

    if (error) {
        return NextResponse.json({error: error.message}, {status: 400})
    }

    return NextResponse.json({message: 'Category deleted'})
}
