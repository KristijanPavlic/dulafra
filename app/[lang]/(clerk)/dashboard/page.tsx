import { UserButton } from '@clerk/nextjs'
import { auth, currentUser } from '@clerk/nextjs/server'
import Dropzone from '../../components/Dropzone'
import DropzoneEvents from '../../components/DropzoneEvents'
import DropzoneGallery from '../../components/DropzoneGallery'
import Link from 'next/link'

export default async function Dashboard() {
  const { userId }: { userId: string | null } = auth()
  const user = await currentUser()
  const adminId = process.env.NEXT_PRIVATE_ADMIN_KEY
  const brankoId = process.env.NEXT_PRIVATE_BRANKO_KEY

  if (userId === adminId || userId === brankoId) {
    return (
      <div className='container flex flex-col justify-center pl-8 pr-8'>
        <h1 className='text-xl font-bold lg:text-3xl'>Upravljačka ploča</h1>
        <h2 className='mt-2 text-base lg:mt-5 lg:text-2xl'>
          Dobro došli, {user?.firstName}
        </h2>
        <div className='mt-5 lg:mt-10'>
          <UserButton afterSignOutUrl='/' />
        </div>
        <div className='mt-6'>
          <Link href='/' className='transition-all hover:text-[#001120]'>
            Povratak na početnu stranicu
          </Link>
        </div>
        <section className='py-24'>
          <div className='container'>
            <h1 className='text-3xl font-bold'>Dodavanje slika</h1>
            <Dropzone className='mt-10 rounded-lg border border-black p-16' />
          </div>
          <div>
            <h1 className='mt-20 text-3xl font-bold'>
              Dodavanje nadolazećih događaja
            </h1>
            <DropzoneEvents className='mt-10 rounded-lg border border-black p-16' />
          </div>
          <div>
            <h1 className='mt-20 text-3xl font-bold'>
              Dodavanje videa u galeriju
            </h1>
            <DropzoneGallery className='mt-10 rounded-lg border border-black p-16' />
          </div>
        </section>
      </div>
    )
  } else {
    return (
      <div className='container flex flex-col items-center justify-center gap-3'>
        <h1 className='text-[8rem] font-bold'>403</h1>
        <h2 className='text-3xl'>Zabranjeno</h2>
        <span className='text-center'>
          Nemate dozvolu za pristup ovoj stranici. Pokušajte se prijaviti s
          drugim računom.
        </span>
        <UserButton afterSignOutUrl='hr/sign-in' />
        <div className='mt-6'>
          <Link
            href='/'
            className='text-lg transition-all hover:text-[#001120]'
          >
            Povratak na početnu stranicu
          </Link>
        </div>
      </div>
    )
  }
}
