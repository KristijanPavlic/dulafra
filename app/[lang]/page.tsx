import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'

import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Search from './components/Search'
import LocaleSwitcher from './components/LocaleSwitcher'
import Products from './components/Products'
import UpcomingEvents from './components/UpcomingEvents'
import ProductsOrder from './components/ProductsOrder'
import Gallery from './components/Gallery'
import BackToTopButton from './components/BackToTopButton'
export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)

  if (!dictionary) {
    return (
      <main>
        <div className='sticky top-0 z-50 bg-red-400 p-1 text-center text-lg font-bold'>
          <span>Error: Unable to load dictionary for locale: {lang}.</span>
        </div>
      </main>
    )
  }

  const { page } = dictionary

  return (
    <main>
      <LocaleSwitcher />
      <Hero
        title={page.hero.title}
        description={page.hero.description}
        btnSearch={page.hero.btnSearch}
        btnProducts={page.hero.btnProducts}
        btnContact={page.hero.btnContact}
        titleEvents={page.upcomingEvents.titleEvents}
      />
      <Search
        title={page.search.title}
        description={page.search.description}
        labelEvent={page.search.labelEvent}
        chooseEvent={page.search.chooseEvent}
        labelDate={page.search.labelDate}
        chooseDate={page.search.chooseDate}
        labelTime={page.search.labelTime}
        chooseTime={page.search.chooseTime}
        labelField={page.search.labelField}
        chooseField={page.search.chooseField}
        btnSearchImages={page.search.btnSearchImages}
        btnDelete={page.search.btnDelete}
        btnDeletion={page.search.btnDeletion}
        warning={page.search.warning}
      />
      <div className='h-[1px] w-full bg-black'></div>
      <Products
        title={page.products.title}
        photo={page.products.photo}
        poster={page.products.poster}
        fifaCard={page.products.fifaCard}
        mug={page.products.mug}
        info={page.products.info}
      />
      <ProductsOrder
        title={page.products.order}
        labelProduct={page.products.labelProduct}
        chooseProduct={page.products.chooseProduct}
        addProduct={page.products.addProduct}
        removeProduct={page.products.removeProduct}
        chooseImage={page.products.chooseImage}
        labelImage={page.products.labelImage}
        labelEvent={page.search.labelEvent}
        chooseEvent={page.search.chooseEvent}
        labelDate={page.search.labelDate}
        chooseDate={page.search.chooseDate}
        labelTime={page.search.labelTime}
        chooseTime={page.search.chooseTime}
        labelField={page.search.labelField}
        chooseField={page.search.chooseField}
        warning={page.search.warning}
        photo={page.products.photo}
        poster={page.products.poster}
        fifaCard={page.products.fifaCard}
        addedItemsLabel={page.products.addedItemsLabel}
        mug={page.products.mug}
        labelName={page.contact.labelName}
        labelEmail={page.contact.labelEmail}
        labelMessage={page.contact.labelMessage}
        btnOrder={page.products.btnOrder}
        btnOrdering={page.products.btnOrdering}
        success={page.contact.success}
        error={page.contact.error}
      />
      <div className='h-[1px] w-full bg-black'></div>
      <UpcomingEvents
        titleEvents={page.upcomingEvents.titleEvents}
        noEvents={page.upcomingEvents.noEvents}
        btnDelete={page.search.btnDelete}
        btnDeletion={page.search.btnDeletion}
      />
      <div className='h-[1px] w-full bg-black'></div>
      <Gallery
        title={page.gallery.title}
        noVideos={page.gallery.noVideos}
        btnDelete={page.gallery.btnDelete}
        btnDeletion={page.gallery.btnDeletion}
      />
      <div className='h-[1px] w-full bg-black'></div>
      <About
        title={page.about.title}
        description={page.about.description}
        years={page.about.years}
        professional={page.about.professional}
        events={page.about.events}
      />
      <div className='h-[1px] w-full bg-black'></div>
      <Contact
        title={page.contact.title}
        description={page.contact.description}
        labelName={page.contact.labelName}
        labelEmail={page.contact.labelEmail}
        labelMessage={page.contact.labelMessage}
        btnSend={page.contact.btnSend}
        btnSending={page.contact.btnSending}
        success={page.contact.success}
        error={page.contact.error}
      />
      <div className='h-[1px] w-full bg-black'></div>
      <Footer
        facebook={page.footer.facebook}
        copyrigth={page.footer.copyrigth}
        rights={page.footer.rights}
      />
      <BackToTopButton />
    </main>
  )
}
