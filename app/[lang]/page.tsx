import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'

import About from "./components/About";
import Albums from "./components/Albums";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Search from "./components/Search";
import LocaleSwitcher from './components/LocaleSwitcher';

export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)
  const { page } = dictionary

  return (
    <main>
      <div className="bg-orange-400 text-lg sticky top-0 p-1 font-bold text-center z-50">
        <span>{page.infoMessage}</span>
      </div>
      <LocaleSwitcher />
      <Hero title={page.hero.title} description={page.hero.description} btnSearch={page.hero.btnSearch} btnContact={page.hero.btnContact} />
      <Search title={page.search.title} description={page.search.description} labelDate={page.search.labelDate} chooseDate={page.search.chooseDate} labelTime={page.search.labelTime} chooseTime={page.search.chooseTime} labelField={page.search.labelField} chooseField={page.search.chooseField} labelTeam={page.search.labelTeam} chooseTeam={page.search.chooseTeam} btnSearchImages={page.search.btnSearchImages} warning={page.search.warning}/>
      {/* <div className="w-full h-[1px] bg-black"></div>
      <Albums /> */}
      <div className="w-full h-[1px] bg-black"></div>
      <About title={page.about.title} description={page.about.description} years={page.about.years} professional={page.about.professional} events={page.about.events}/>
      <div className="w-full h-[1px] bg-black"></div>
      <Contact title={page.contact.title} description={page.contact.description} labelName={page.contact.labelName} labelEmail={page.contact.labelEmail} labelMessage={page.contact.labelMessage} btnSend={page.contact.btnSend} btnSending={page.contact.btnSending} success={page.contact.success} error={page.contact.error} />
      <div className="w-full h-[1px] bg-black"></div>
      <Footer facebook={page.footer.facebook} copyrigth={page.footer.copyrigth} rights={page.footer.rights}/>
    </main>
  );
}
