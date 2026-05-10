import { useState } from 'react';
import { BookOpen, Info, MessageCircle, ChevronLeft, ChevronRight, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { howToUse, scriptsPart2, banksPart3 } from './data';

type Section = 'how-to-use' | 'part2' | 'part3';

const HighlightedText = ({ htmlContent, vocabList }: { htmlContent: string, vocabList?: {en: string, zh: string}[] }) => {
  const parts = htmlContent.split(/(<mark>.*?<\/mark>)/g);
  
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('<mark>') && part.endsWith('</mark>')) {
          const innerText = part.slice(6, -7);
          const plainText = innerText.replace(/<[^>]+>/g, '');
          
          let matches: {en: string, zh: string}[] = [];
          if (vocabList) {
             const normalize = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').split(/\s+/).filter(w => w.length > 2 && !['sb', 'sth', 'ones', 'one'].includes(w));
             const markedWords = normalize(plainText);
             matches = vocabList.filter(v => {
                const vocabWords = normalize(v.en);
                if (vocabWords.length === 0) return false;
                let matchCount = 0;
                for (const vw of vocabWords) {
                  const root = vw.length > 4 ? vw.slice(0, 4) : vw;
                  if (markedWords.some(mw => mw.includes(root) || root.includes(mw))) {
                    matchCount++;
                  }
                }
                return (matchCount / vocabWords.length) >= 0.49;
             });
          }

          if (matches.length > 0) {
            return (
              <HoverCard key={index} openDelay={100}>
                <HoverCardTrigger asChild>
                  <mark className="cursor-help underline decoration-amber-300 decoration-dashed underline-offset-4 transition-colors hover:bg-amber-200" dangerouslySetInnerHTML={{ __html: innerText }} />
                </HoverCardTrigger>
                <HoverCardContent className="w-auto max-w-sm" side="top">
                  <div className="space-y-2">
                    {matches.map((m, i) => (
                      <div key={i} className="text-sm">
                        <span className="font-bold text-slate-900 block">{m.en}</span>
                        <span className="text-slate-600">{m.zh}</span>
                      </div>
                    ))}
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          } else {
            return <mark key={index} dangerouslySetInnerHTML={{ __html: innerText }} />;
          }
        }
        
        return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
      })}
    </>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState<Section>('how-to-use');
  const [activeIndex, setActiveIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderHowToUse = () => (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="px-0">
        <CardTitle className="text-3xl font-bold">{howToUse.title}</CardTitle>
      </CardHeader>
      <CardContent className="px-0 space-y-6 text-lg leading-relaxed text-muted-foreground">
        {howToUse.content.map((text, i) => (
          <p key={i} dangerouslySetInnerHTML={{ __html: text }} />
        ))}
      </CardContent>
    </Card>
  );

  const renderPart2Script = () => {
    const script = scriptsPart2[activeIndex];
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
        <div className="space-y-4">
          <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
            Part 2
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">{script.title}</h1>
          <p className="text-xl text-muted-foreground italic">{script.subtitle}</p>
        </div>

        <div className="space-y-8">
          {script.content.map((block, i) => (
            <div key={i} className="space-y-2">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-400">
                [{block.angle}]
              </h3>
              <p className="text-lg leading-relaxed text-slate-800">
                <HighlightedText htmlContent={block.text} vocabList={script.vocab} />
              </p>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-teal-800">
            Band 7+ Vocabulary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {script.vocab.map((v, i) => (
              <div key={i} className="flex flex-col py-2 border-b border-slate-100">
                <span className="font-semibold text-slate-900">{v.en}</span>
                <span className="text-slate-500 text-sm">{v.zh}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        <div className="space-y-6">
          <Card className="bg-slate-50 border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-slate-500" />
                Cue cards covered ({script.coverage.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                {script.coverage.map((c, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: c }} />
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200 border-dashed">
            <CardContent className="p-4 flex gap-3 text-orange-900">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-orange-600" />
              <p className="text-sm" dangerouslySetInnerHTML={{ __html: script.adaptationTip.replace('<strong>Adaptation tip:</strong>', '<strong class="text-orange-700">Adaptation Tip:</strong>') }} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderPart3Bank = () => {
    const bank = banksPart3[activeIndex];
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
        <div className="space-y-4">
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Part 3
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">{bank.title}</h1>
          <p className="text-xl text-muted-foreground italic">{bank.subtitle}</p>
        </div>

        <Card className="bg-slate-50 border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-slate-500" />
              Topics Covered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 font-medium leading-relaxed">{bank.coverage}</p>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Accordion className="w-full space-y-4">
            {bank.qa.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white border rounded-lg px-4 shadow-sm">
                <AccordionTrigger className="hover:no-underline text-left py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full pr-4">
                    <span className="font-semibold text-lg text-teal-700 flex-1">{item.q}</span>
                    <Badge variant="secondary" className="w-fit">{item.tag}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-lg leading-relaxed text-slate-700 pb-4 pt-2">
                  <div>
                    <HighlightedText htmlContent={item.a} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    );
  };

  const currentLength = activeSection === 'part2' ? scriptsPart2.length : banksPart3.length;

  const handleNext = () => {
    if (activeIndex < currentLength - 1) setActiveIndex(i => i + 1);
  };

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex(i => i - 1);
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] flex flex-col md:flex-row text-slate-900 font-sans selection:bg-teal-200">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-white sticky top-0 z-50">
        <span className="font-bold text-lg tracking-tight">IELTS Scripts</span>
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <List className="w-6 h-6" />
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed md:sticky top-0 left-0 h-screen w-72 bg-slate-900 text-slate-100 flex flex-col z-40 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-tight text-white mb-1">IELTS Speaking</h2>
          <p className="text-slate-400 text-sm">5 Universal Scripts Focus Mode</p>
        </div>

        <ScrollArea className="flex-1 px-4">
          <div className="space-y-6 pb-8">
            <div>
              <Button 
                variant={activeSection === 'how-to-use' ? 'secondary' : 'ghost'} 
                className={`w-full justify-start ${activeSection === 'how-to-use' ? 'bg-slate-800 hover:bg-slate-800' : 'hover:bg-slate-800/50 hover:text-white text-slate-300'}`}
                onClick={() => { setActiveSection('how-to-use'); setSidebarOpen(false); }}
              >
                <Info className="w-4 h-4 mr-2" />
                How to Use
              </Button>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 px-4">Part 2 Scripts</h3>
              <div className="space-y-1">
                {scriptsPart2.map((script, idx) => (
                  <Button
                    key={script.id}
                    variant={activeSection === 'part2' && activeIndex === idx ? 'secondary' : 'ghost'}
                    className={`w-full justify-start text-left font-normal ${activeSection === 'part2' && activeIndex === idx ? 'bg-teal-900/40 text-teal-100 hover:bg-teal-900/40' : 'hover:bg-slate-800/50 hover:text-white text-slate-400'}`}
                    onClick={() => { setActiveSection('part2'); setActiveIndex(idx); setSidebarOpen(false); }}
                  >
                    Script {idx + 1}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 px-4">Part 3 Banks</h3>
              <div className="space-y-1">
                {banksPart3.map((bank, idx) => (
                  <Button
                    key={bank.id}
                    variant={activeSection === 'part3' && activeIndex === idx ? 'secondary' : 'ghost'}
                    className={`w-full justify-start text-left font-normal ${activeSection === 'part3' && activeIndex === idx ? 'bg-amber-900/40 text-amber-100 hover:bg-amber-900/40' : 'hover:bg-slate-800/50 hover:text-white text-slate-400'}`}
                    onClick={() => { setActiveSection('part3'); setActiveIndex(idx); setSidebarOpen(false); }}
                  >
                    Bank {idx + 1}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative max-w-4xl mx-auto w-full">
        <ScrollArea className="flex-1">
          <main className="p-6 md:p-12 lg:p-16">
            {activeSection === 'how-to-use' && renderHowToUse()}
            {activeSection === 'part2' && renderPart2Script()}
            {activeSection === 'part3' && renderPart3Bank()}
          </main>
        </ScrollArea>

        {/* Bottom Pagination Controls */}
        {activeSection !== 'how-to-use' && (
          <div className="sticky bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t p-4 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <Button 
              variant="outline" 
              size="lg"
              disabled={activeIndex === 0} 
              onClick={handlePrev}
              className="min-w-[120px]"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Previous
            </Button>
            <span className="text-sm font-medium text-slate-500 hidden sm:inline-block">
              {activeSection === 'part2' ? 'Part 2' : 'Part 3'} • {activeIndex + 1} / {currentLength}
            </span>
            <Button 
              variant="default" 
              size="lg"
              disabled={activeIndex === currentLength - 1} 
              onClick={handleNext}
              className="min-w-[120px] bg-slate-900 hover:bg-slate-800 text-white"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;