import NavBar from '@/components/navbar'
import { columns } from './columns'
import { DataTable } from './data-table'
import { createClient } from '@supabase/supabase-js'
import { auth } from '@clerk/nextjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
)

async function getData() {
  const { userId } = auth()
  const { data, error } = await supabase
    .from('links')
    .select('long_link, short_link, clicks')
    .eq('user_id', userId)

  if (data === null) {
    return []
  }
  const newData = data.map((item) => {
    item.short_link = 'dyt.to/' + item.short_link
    return item
  })
  return newData
}

export default async function AccountPage() {
  const data = await getData()

  return (
    <>
      <div className='container mx-auto py-10'>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  )
}
