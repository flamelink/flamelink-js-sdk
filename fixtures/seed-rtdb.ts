import getImageSizes from './image-sizes'
import getGlobals from './globals'

interface FlamelinkMeta {
  createdBy: string
  createdDate: string
  lastModifiedBy?: string
  lastModifiedDate?: string
}

interface Media {
  files: any
  folders: any
}

interface PermissionGroup {
  __meta__?: FlamelinkMeta
  id: string | number
  name: string
  content: any
  environments: any
  media: any
  navigation: any
  permissions: any
  schemas: any
  settings: any
  users: any
}

interface Permissions {
  [key: string]: PermissionGroup
}

interface Settings {
  backups: any
  defaultLocale: any
  locales: any
  environments: any
  general: any
  globals: any
}

interface SeedRTDB {
  environments: any
  media: Media
  permissions: Permissions
  settings: Settings
  users: any
}

export default (): SeedRTDB => ({
  environments: {
    development: {
      __meta__: {
        createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
        createdDate: '2018-09-26T16:32:39.289Z'
      },
      content: {
        dataProtection: {
          'en-US': {
            __meta__: {
              createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
              createdDate: '2018-06-20T17:40:51.461Z',
              lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
              lastModifiedDate: '2018-10-15T16:16:55.336Z'
            },
            id: 'dataProtection',
            text:
              '<h2>Datenschutzerkl&auml;rung</h2>\n\n<h3>&nbsp;</h3>\n\n<p>Diese Datenschutzerkl&auml;rung kl&auml;rt Sie &uuml;ber die Art, den Umfang und Zweck der Verarbeitung von personenbezogenen Daten (nachfolgend kurz &bdquo;Daten&ldquo;) im Rahmen der Erbringung unserer Leistungen sowie innerhalb unseres Onlineangebotes und der mit ihm verbundenen Webseiten, Funktionen und Inhalte sowie externen Onlinepr&auml;senzen, wie z.B. unser Social Media Profile auf (nachfolgend gemeinsam bezeichnet als &bdquo;Onlineangebot&ldquo;). Im Hinblick auf die verwendeten Begrifflichkeiten, wie z.B. &bdquo;Verarbeitung&ldquo; oder &bdquo;Verantwortlicher&ldquo; verweisen wir auf die Definitionen im Art. 4 der Datenschutzgrundverordnung (DSGVO).<br />\n&nbsp;</p>\n\n<h3>Verantwortlicher</h3>\n\n<p>Vorname, Name / Firma<br />\nStra&szlig;e, Hausnr.<br />\nPLZ, Ort, Land<br />\nE-Mailadresse: ....@....de<br />\nGesch&auml;ftsf&uuml;hrer/ Inhaber: Vorname/n, Namen/n (sofern vorhanden)<br />\nLink zum Impressum: http://....de<br />\nKontakt Datenschutzbeauftragte/r: &hellip;.@&hellip;.de (sofern vorhanden)</p>\n\n<h3>Arten der verarbeiteten Daten</h3>\n\n<p>- Bestandsdaten (z.B., Personen-Stammdaten, Namen oder Adressen).<br />\n- Kontaktdaten (z.B., E-Mail, Telefonnummern).<br />\n- Inhaltsdaten (z.B., Texteingaben, Fotografien, Videos).<br />\n- Nutzungsdaten (z.B., besuchte Webseiten, Interesse an Inhalten, Zugriffszeiten).<br />\n- Meta-/Kommunikationsdaten (z.B., Ger&auml;te-Informationen, IP-Adressen).</p>\n\n<h3>Kategorien betroffener Personen</h3>\n\n<p>Besucher und Nutzer des Onlineangebotes (Nachfolgend bezeichnen wir die betroffenen Personen zusammenfassend auch als &bdquo;Nutzer&ldquo;).</p>\n\n<h3>Zweck der Verarbeitung</h3>\n\n<p>- Zurverf&uuml;gungstellung des Onlineangebotes, seiner Funktionen und Inhalte.<br />\n- Beantwortung von Kontaktanfragen und Kommunikation mit Nutzern.<br />\n- Sicherheitsma&szlig;nahmen.<br />\n- Reichweitenmessung/Marketing</p>\n\n<h3>Verwendete Begrifflichkeiten</h3>\n\n<p>&bdquo;Personenbezogene Daten&ldquo; sind alle Informationen, die sich auf eine identifizierte oder identifizierbare nat&uuml;rliche Person (im Folgenden &bdquo;betroffene Person&ldquo;) beziehen; als identifizierbar wird eine nat&uuml;rliche Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung (z.B. Cookie) oder zu einem oder mehreren besonderen Merkmalen identifiziert werden kann, die Ausdruck der physischen, physiologischen, genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen Identit&auml;t dieser nat&uuml;rlichen Person sind.<br />\n<br />\n&bdquo;Verarbeitung&ldquo; ist jeder mit oder ohne Hilfe automatisierter Verfahren ausgef&uuml;hrte Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten. Der Begriff reicht weit und umfasst praktisch jeden Umgang mit Daten.<br />\n<br />\n&bdquo;Pseudonymisierung&ldquo; die Verarbeitung personenbezogener Daten in einer Weise, dass die personenbezogenen Daten ohne Hinzuziehung zus&auml;tzlicher Informationen nicht mehr einer spezifischen betroffenen Person zugeordnet werden k&ouml;nnen, sofern diese zus&auml;tzlichen Informationen gesondert aufbewahrt werden und technischen und organisatorischen Ma&szlig;nahmen unterliegen, die gew&auml;hrleisten, dass die personenbezogenen Daten nicht einer identifizierten oder identifizierbaren nat&uuml;rlichen Person zugewiesen werden.<br />\n<br />\n&bdquo;Profiling&ldquo; jede Art der automatisierten Verarbeitung personenbezogener Daten, die darin besteht, dass diese personenbezogenen Daten verwendet werden, um bestimmte pers&ouml;nliche Aspekte, die sich auf eine nat&uuml;rliche Person beziehen, zu bewerten, insbesondere um Aspekte bez&uuml;glich Arbeitsleistung, wirtschaftliche Lage, Gesundheit, pers&ouml;nliche Vorlieben, Interessen, Zuverl&auml;ssigkeit, Verhalten, Aufenthaltsort oder Ortswechsel dieser nat&uuml;rlichen Person zu analysieren oder vorherzusagen.<br />\n<br />\nAls &bdquo;Verantwortlicher&ldquo; wird die nat&uuml;rliche oder juristische Person, Beh&ouml;rde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen &uuml;ber die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet, bezeichnet.<br />\n<br />\n&bdquo;Auftragsverarbeiter&ldquo; eine nat&uuml;rliche oder juristische Person, Beh&ouml;rde, Einrichtung oder andere Stelle, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet.</p>\n\n<h3>Ma&szlig;gebliche Rechtsgrundlagen</h3>\n\n<p>Nach Ma&szlig;gabe des Art. 13 DSGVO teilen wir Ihnen die Rechtsgrundlagen unserer Datenverarbeitungen mit. F&uuml;r Nutzer aus dem Geltungsbereich der Datenschutzgrundverordnung (DSGVO), d.h. der EU und des EWG gilt, sofern die Rechtsgrundlage in der Datenschutzerkl&auml;rung nicht genannt wird, Folgendes:<br />\nDie Rechtsgrundlage f&uuml;r die Einholung von Einwilligungen ist Art. 6 Abs. 1 lit. a und Art. 7 DSGVO;<br />\nDie Rechtsgrundlage f&uuml;r die Verarbeitung zur Erf&uuml;llung unserer Leistungen und Durchf&uuml;hrung vertraglicher Ma&szlig;nahmen sowie Beantwortung von Anfragen ist Art. 6 Abs. 1 lit. b DSGVO;<br />\nDie Rechtsgrundlage f&uuml;r die Verarbeitung zur Erf&uuml;llung unserer rechtlichen Verpflichtungen ist Art. 6 Abs. 1 lit. c DSGVO;<br />\nF&uuml;r den Fall, dass lebenswichtige Interessen der betroffenen Person oder einer anderen nat&uuml;rlichen Person eine Verarbeitung personenbezogener Daten erforderlich machen, dient Art. 6 Abs. 1 lit. d DSGVO als Rechtsgrundlage.<br />\nDie Rechtsgrundlage f&uuml;r die erforderliche Verarbeitung zur Wahrnehmung einer Aufgabe, die im &ouml;ffentlichen Interesse liegt oder in Aus&uuml;bung &ouml;ffentlicher Gewalt erfolgt, die dem Verantwortlichen &uuml;bertragen wurde ist Art. 6 Abs. 1 lit. e DSGVO.<br />\nDie Rechtsgrundlage f&uuml;r die Verarbeitung zur Wahrung unserer berechtigten Interessen ist Art. 6 Abs. 1 lit. f DSGVO.<br />\nDie Verarbeitung von Daten zu anderen Zwecken als denen, zu denen sie ehoben wurden, bestimmt sich nach den Vorgaben des Art 6 Abs. 4 DSGVO.<br />\nDie Verarbeitung von besonderen Kategorien von Daten (entsprechend Art. 9 Abs. 1 DSGVO) bestimmt sich nach den Vorgaben des Art. 9 Abs. 2 DSGVO.</p>\n\n<h3>Sicherheitsma&szlig;nahmen</h3>\n\n<p>Wir treffen nach Ma&szlig;gabe der gesetzlichen Vorgabenunter Ber&uuml;cksichtigung des Stands der Technik, der Implementierungskosten und der Art, des Umfangs, der Umst&auml;nde und der Zwecke der Verarbeitung sowie der unterschiedlichen Eintrittswahrscheinlichkeit und Schwere des Risikos f&uuml;r die Rechte und Freiheiten nat&uuml;rlicher Personen, geeignete technische und organisatorische Ma&szlig;nahmen, um ein dem Risiko angemessenes Schutzniveau zu gew&auml;hrleisten.<br />\n<br />\nZu den Ma&szlig;nahmen geh&ouml;ren insbesondere die Sicherung der Vertraulichkeit, Integrit&auml;t und Verf&uuml;gbarkeit von Daten durch Kontrolle des physischen Zugangs zu den Daten, als auch des sie betreffenden Zugriffs, der Eingabe, Weitergabe, der Sicherung der Verf&uuml;gbarkeit und ihrer Trennung. Des Weiteren haben wir Verfahren eingerichtet, die eine Wahrnehmung von Betroffenenrechten, L&ouml;schung von Daten und Reaktion auf Gef&auml;hrdung der Daten gew&auml;hrleisten. Ferner ber&uuml;cksichtigen wir den Schutz personenbezogener Daten bereits bei der Entwicklung, bzw. Auswahl von Hardware, Software sowie Verfahren, entsprechend dem Prinzip des Datenschutzes durch Technikgestaltung und durch datenschutzfreundliche Voreinstellungen.</p>\n\n<h3>Zusammenarbeit mit Auftragsverarbeitern, gemeinsam Verantwortlichen und Dritten</h3>\n\n<p>Sofern wir im Rahmen unserer Verarbeitung Daten gegen&uuml;ber anderen Personen und Unternehmen (Auftragsverarbeitern, gemeinsam Verantwortlichen oder Dritten) offenbaren, sie an diese &uuml;bermitteln oder ihnen sonst Zugriff auf die Daten gew&auml;hren, erfolgt dies nur auf Grundlage einer gesetzlichen Erlaubnis (z.B. wenn eine &Uuml;bermittlung der Daten an Dritte, wie an Zahlungsdienstleister, zur Vertragserf&uuml;llung erforderlich ist), Nutzer eingewilligt haben, eine rechtliche Verpflichtung dies vorsieht oder auf Grundlage unserer berechtigten Interessen (z.B. beim Einsatz von Beauftragten, Webhostern, etc.).<br />\n<br />\nSofern wir Daten anderen Unternehmen unserer Unternehmensgruppe offenbaren, &uuml;bermitteln oder ihnen sonst den Zugriff gew&auml;hren, erfolgt dies insbesondere zu administrativen Zwecken als berechtigtes Interesse und dar&uuml;berhinausgehend auf einer den gesetzlichen Vorgaben entsprechenden Grundlage.</p>\n\n<h3>&Uuml;bermittlungen in Drittl&auml;nder</h3>\n\n<p>Sofern wir Daten in einem Drittland (d.h. au&szlig;erhalb der Europ&auml;ischen Union (EU), des Europ&auml;ischen Wirtschaftsraums (EWR) oder der Schweizer Eidgenossenschaft) verarbeiten oder dies im Rahmen der Inanspruchnahme von Diensten Dritter oder Offenlegung, bzw. &Uuml;bermittlung von Daten an andere Personen oder Unternehmen geschieht, erfolgt dies nur, wenn es zur Erf&uuml;llung unserer (vor)vertraglichen Pflichten, auf Grundlage Ihrer Einwilligung, aufgrund einer rechtlichen Verpflichtung oder auf Grundlage unserer berechtigten Interessen geschieht. Vorbehaltlich gesetzlicher oder vertraglicher Erlaubnisse, verarbeiten oder lassen wir die Daten in einem Drittland nur beim Vorliegen der gesetzlichen Voraussetzungen. D.h. die Verarbeitung erfolgt z.B. auf Grundlage besonderer Garantien, wie der offiziell anerkannten Feststellung eines der EU entsprechenden Datenschutzniveaus (z.B. f&uuml;r die USA durch das &bdquo;Privacy Shield&ldquo;) oder Beachtung offiziell anerkannter spezieller vertraglicher Verpflichtungen.</p>\n\n<h3>Rechte der betroffenen Personen</h3>\n\n<p>Sie haben das Recht, eine Best&auml;tigung dar&uuml;ber zu verlangen, ob betreffende Daten verarbeitet werden und auf Auskunft &uuml;ber diese Daten sowie auf weitere Informationen und Kopie der Daten entsprechend den gesetzlichen Vorgaben.<br />\n<br />\nSie haben entsprechend. den gesetzlichen Vorgaben das Recht, die Vervollst&auml;ndigung der Sie betreffenden Daten oder die Berichtigung der Sie betreffenden unrichtigen Daten zu verlangen.<br />\n<br />\nSie haben nach Ma&szlig;gabe der gesetzlichen Vorgaben das Recht zu verlangen, dass betreffende Daten unverz&uuml;glich gel&ouml;scht werden, bzw. alternativ nach Ma&szlig;gabe der gesetzlichen Vorgaben eine Einschr&auml;nkung der Verarbeitung der Daten zu verlangen.<br />\n<br />\nSie haben das Recht zu verlangen, dass die Sie betreffenden Daten, die Sie uns bereitgestellt haben nach Ma&szlig;gabe der gesetzlichen Vorgaben zu erhalten und deren &Uuml;bermittlung an andere Verantwortliche zu fordern.<br />\n<br />\nSie haben ferner nach Ma&szlig;gabe der gesetzlichen Vorgaben das Recht, eine Beschwerde bei der zust&auml;ndigen Aufsichtsbeh&ouml;rde einzureichen.</p>\n\n<h3>Widerrufsrecht</h3>\n\n<p>Sie haben das Recht, erteilte Einwilligungen mit Wirkung f&uuml;r die Zukunft zu widerrufen.</p>\n\n<h3>Widerspruchsrecht</h3>\n\n<p><strong>Sie k&ouml;nnen der k&uuml;nftigen Verarbeitung der Sie betreffenden Daten nach Ma&szlig;gabe der gesetzlichen Vorgaben jederzeit widersprechen. Der Widerspruch kann insbesondere gegen die Verarbeitung f&uuml;r Zwecke der Direktwerbung erfolgen.</strong></p>\n\n<h3>Cookies und Widerspruchsrecht bei Direktwerbung</h3>\n\n<p>Als &bdquo;Cookies&ldquo; werden kleine Dateien bezeichnet, die auf Rechnern der Nutzer gespeichert werden. Innerhalb der Cookies k&ouml;nnen unterschiedliche Angaben gespeichert werden. Ein Cookie dient prim&auml;r dazu, die Angaben zu einem Nutzer (bzw. dem Ger&auml;t auf dem das Cookie gespeichert ist) w&auml;hrend oder auch nach seinem Besuch innerhalb eines Onlineangebotes zu speichern. Als tempor&auml;re Cookies, bzw. &bdquo;Session-Cookies&ldquo; oder &bdquo;transiente Cookies&ldquo;, werden Cookies bezeichnet, die gel&ouml;scht werden, nachdem ein Nutzer ein Onlineangebot verl&auml;sst und seinen Browser schlie&szlig;t. In einem solchen Cookie kann z.B. der Inhalt eines Warenkorbs in einem Onlineshop oder ein Login-Status gespeichert werden. Als &bdquo;permanent&ldquo; oder &bdquo;persistent&ldquo; werden Cookies bezeichnet, die auch nach dem Schlie&szlig;en des Browsers gespeichert bleiben. So kann z.B. der Login-Status gespeichert werden, wenn die Nutzer diese nach mehreren Tagen aufsuchen. Ebenso k&ouml;nnen in einem solchen Cookie die Interessen der Nutzer gespeichert werden, die f&uuml;r Reichweitenmessung oder Marketingzwecke verwendet werden. Als &bdquo;Third-Party-Cookie&ldquo; werden Cookies bezeichnet, die von anderen Anbietern als dem Verantwortlichen, der das Onlineangebot betreibt, angeboten werden (andernfalls, wenn es nur dessen Cookies sind spricht man von &bdquo;First-Party Cookies&ldquo;).<br />\n<br />\nWir k&ouml;nnen tempor&auml;re und permanente Cookies einsetzen und kl&auml;ren hier&uuml;ber im Rahmen unserer Datenschutzerkl&auml;rung auf.<br />\n<br />\nFalls die Nutzer nicht m&ouml;chten, dass Cookies auf ihrem Rechner gespeichert werden, werden sie gebeten die entsprechende Option in den Systemeinstellungen ihres Browsers zu deaktivieren. Gespeicherte Cookies k&ouml;nnen in den Systemeinstellungen des Browsers gel&ouml;scht werden. Der Ausschluss von Cookies kann zu Funktionseinschr&auml;nkungen dieses Onlineangebotes f&uuml;hren.<br />\n<br />\nEin genereller Widerspruch gegen den Einsatz der zu Zwecken des Onlinemarketing eingesetzten Cookies kann bei einer Vielzahl der Dienste, vor allem im Fall des Trackings, &uuml;ber die US-amerikanische Seite <a href="http://www.aboutads.info/choices/">http://www.aboutads.info/choices/</a> oder die EU-Seite <a href="http://www.youronlinechoices.com/">http://www.youronlinechoices.com/</a> erkl&auml;rt werden. Des Weiteren kann die Speicherung von Cookies mittels deren Abschaltung in den Einstellungen des Browsers erreicht werden. Bitte beachten Sie, dass dann gegebenenfalls nicht alle Funktionen dieses Onlineangebotes genutzt werden k&ouml;nnen.</p>\n\n<h3>L&ouml;schung von Daten</h3>\n\n<p>Die von uns verarbeiteten Daten werden nach Ma&szlig;gabe der gesetzlichen Vorgaben gel&ouml;scht oder in ihrer Verarbeitung eingeschr&auml;nkt. Sofern nicht im Rahmen dieser Datenschutzerkl&auml;rung ausdr&uuml;cklich angegeben, werden die bei uns gespeicherten Daten gel&ouml;scht, sobald sie f&uuml;r ihre Zweckbestimmung nicht mehr erforderlich sind und der L&ouml;schung keine gesetzlichen Aufbewahrungspflichten entgegenstehen.<br />\n<br />\nSofern die Daten nicht gel&ouml;scht werden, weil sie f&uuml;r andere und gesetzlich zul&auml;ssige Zwecke erforderlich sind, wird deren Verarbeitung eingeschr&auml;nkt. D.h. die Daten werden gesperrt und nicht f&uuml;r andere Zwecke verarbeitet. Das gilt z.B. f&uuml;r Daten, die aus handels- oder steuerrechtlichen Gr&uuml;nden aufbewahrt werden m&uuml;ssen.</p>\n\n<h3>&Auml;nderungen und Aktualisierungen der Datenschutzerkl&auml;rung</h3>\n\n<p>Wir bitten Sie sich regelm&auml;&szlig;ig &uuml;ber den Inhalt unserer Datenschutzerkl&auml;rung zu informieren. Wir passen die Datenschutzerkl&auml;rung an, sobald die &Auml;nderungen der von uns durchgef&uuml;hrten Datenverarbeitungen dies erforderlich machen. Wir informieren Sie, sobald durch die &Auml;nderungen eine Mitwirkungshandlung Ihrerseits (z.B. Einwilligung) oder eine sonstige individuelle Benachrichtigung erforderlich wird.</p>\n\n<p>&nbsp;</p>\n\n<h3>Gesch&auml;ftsbezogene Verarbeitung</h3>\n\n<p>&nbsp;</p>\n\n<p>Zus&auml;tzlich verarbeiten wir<br />\n- Vertragsdaten (z.B., Vertragsgegenstand, Laufzeit, Kundenkategorie).<br />\n- Zahlungsdaten (z.B., Bankverbindung, Zahlungshistorie)<br />\nvon unseren Kunden, Interessenten und Gesch&auml;ftspartner zwecks Erbringung vertraglicher Leistungen, Service und Kundenpflege, Marketing, Werbung und Marktforschung.</p>\n\n<p>&nbsp;</p>\n\n<h3>Teilnahme an Affiliate-Partnerprogrammen</h3>\n\n<p>&nbsp;</p>\n\n<p>Innerhalb unseres Onlineangebotes setzen wir auf Grundlage unserer berechtigten Interessen (d.h. Interesse an der Analyse, Optimierung und wirtschaftlichem Betrieb unseres Onlineangebotes) gem. Art. 6 Abs. 1 lit. f DSGVO branchen&uuml;bliche Trackingma&szlig;nahmen ein, soweit diese f&uuml;r den Betrieb des Affiliatesystems erforderlich sind. Nachfolgend kl&auml;ren wir die Nutzer &uuml;ber die technischen Hintergr&uuml;nde auf.<br />\n<br />\nDie von unseren Vertragspartnern angebotene Leistungen k&ouml;nnen auch auf anderen Webseiten beworben und verlinkt werden (sog. Affiliate-Links oder After-Buy-Systeme, wenn z.B. Links oder Leistungen Dritter nach einem Vertragsschluss angeboten werden). Die Betreiber der jeweiligen Webseiten erhalten eine Provision, wenn Nutzer den Affiliate-Links folgen und anschlie&szlig;end die Angebote wahrnehmen.<br />\n<br />\nZusammenfassend, ist es f&uuml;r unser Onlineangebot erforderlich, dass wir nachverfolgen k&ouml;nnen, ob Nutzer, die sich f&uuml;r Affiliate-Links und/oder die bei uns verf&uuml;gbaren Angebote interessieren, die Angebote anschlie&szlig;end auf die Veranlassung der Affiliate-Links oder unserer Onlineplattform, wahrnehmen. Hierzu werden die Affiliate-Links und unsere Angebote um bestimmte Werte erg&auml;nzt, die ein Bestandteil des Links oder anderweitig, z.B. in einem Cookie, gesetzt werden k&ouml;nnen. Zu den Werten geh&ouml;ren insbesondere die Ausgangswebseite (Referrer), Zeitpunkt, eine Online-Kennung der Betreiber der Webseite, auf der sich der Affiliate-Link befand, eine Online-Kennung des jeweiligen Angebotes, eine Online-Kennung des Nutzers, als auch Tracking-spezifische Werte wie z.B. Werbemittel-ID, Partner-ID und Kategorisierungen.<br />\n<br />\nBei der von uns verwendeten Online-Kennungen der Nutzer, handelt es sich um pseudonyme Werte. D.h. die Online-Kennungen enthalten selbst keine personenbezogenen Daten wie Namen oder E-Mailadressen. Sie helfen uns nur zu bestimmen ob derselbe Nutzer, der auf einen Affiliate-Link geklickt oder sich &uuml;ber unser Onlineangebot f&uuml;r ein Angebot interessiert hat, das Angebot wahrgenommen, d.h. z.B. einen Vertrag mit dem Anbieter abgeschlossen hat. Die Online-Kennung ist jedoch insoweit personenbezogen, als dem Partnerunternehmen und auch uns, die Online-Kennung zusammen mit anderen Nutzerdaten vorliegen. Nur so kann das Partnerunternehmen uns mitteilen, ob derjenige Nutzer das Angebot wahrgenommen hat und wir z.B. den Bonus auszahlen k&ouml;nnen.</p>\n\n<p>&nbsp;</p>\n\n<h3>Amazon-Partnerprogramm</h3>\n\n<p>&nbsp;</p>\n\n<p>Wir sind auf Grundlage unserer berechtigten Interessen (d.h. Interesse am wirtschaftlichem Betrieb unseres Onlineangebotes im Sinne des Art. 6 Abs. 1 lit. f. DSGVO) Teilnehmer des Partnerprogramms von Amazon EU, das zur Bereitstellung eines Mediums f&uuml;r Websites konzipiert wurde, mittels dessen durch die Platzierung von Werbeanzeigen und Links zu Amazon.de Werbekostenerstattung verdient werden kann (sog. Affiliate-System). D.h. als Amazon-Partner verdienen wir an qualifizierten K&auml;ufen.<br />\n<br />\nAmazon setzt Cookies ein, um die Herkunft der Bestellungen nachvollziehen zu k&ouml;nnen. Unter anderem kann Amazon erkennen, dass Sie den Partnerlink auf dieser Website geklickt und anschlie&szlig;end ein Produkt bei Amazon erworben haben.<br />\n<br />\nWeitere Informationen zur Datennutzung durch Amazon und Widerspruchsm&ouml;glichkeiten erhalten Sie in der Datenschutzerkl&auml;rung des Unternehmens: <a href="https://www.amazon.de/gp/help/customer/display.html?nodeId=201909010" target="_blank">https://www.amazon.de/gp/help/customer/display.html?nodeId=201909010</a>.<br />\n<br />\nHinweis: Amazon und das Amazon-Logo sind Warenzeichen von Amazon.com, Inc. oder eines seiner verbundenen Unternehmen.</p>\n\n<p>&nbsp;</p>\n\n<h3>Hosting und E-Mail-Versand</h3>\n\n<p>&nbsp;</p>\n\n<p>Die von uns in Anspruch genommenen Hosting-Leistungen dienen der Zurverf&uuml;gungstellung der folgenden Leistungen: Infrastruktur- und Plattformdienstleistungen, Rechenkapazit&auml;t, Speicherplatz und Datenbankdienste, E-Mail-Versand, Sicherheitsleistungen sowie technische Wartungsleistungen, die wir zum Zwecke des Betriebs dieses Onlineangebotes einsetzen.<br />\n<br />\nHierbei verarbeiten wir, bzw. unser Hostinganbieter Bestandsdaten, Kontaktdaten, Inhaltsdaten, Vertragsdaten, Nutzungsdaten, Meta- und Kommunikationsdaten von Kunden, Interessenten und Besuchern dieses Onlineangebotes auf Grundlage unserer berechtigten Interessen an einer effizienten und sicheren Zurverf&uuml;gungstellung dieses Onlineangebotes gem. Art. 6 Abs. 1 lit. f DSGVO i.V.m. Art. 28 DSGVO (Abschluss Auftragsverarbeitungsvertrag).</p>\n\n<p>&nbsp;</p>\n\n<h3>Erhebung von Zugriffsdaten und Logfiles</h3>\n\n<p>&nbsp;</p>\n\n<p>Wir, bzw. unser Hostinganbieter, erhebt auf Grundlage unserer berechtigten Interessen im Sinne des Art. 6 Abs. 1 lit. f. DSGVO Daten &uuml;ber jeden Zugriff auf den Server, auf dem sich dieser Dienst befindet (sogenannte Serverlogfiles). Zu den Zugriffsdaten geh&ouml;ren Name der abgerufenen Webseite, Datei, Datum und Uhrzeit des Abrufs, &uuml;bertragene Datenmenge, Meldung &uuml;ber erfolgreichen Abruf, Browsertyp nebst Version, das Betriebssystem des Nutzers, Referrer URL (die zuvor besuchte Seite), IP-Adresse und der anfragende Provider.<br />\n<br />\nLogfile-Informationen werden aus Sicherheitsgr&uuml;nden (z.B. zur Aufkl&auml;rung von Missbrauchs- oder Betrugshandlungen) f&uuml;r die Dauer von maximal 7 Tagen gespeichert und danach gel&ouml;scht. Daten, deren weitere Aufbewahrung zu Beweiszwecken erforderlich ist, sind bis zur endg&uuml;ltigen Kl&auml;rung des jeweiligen Vorfalls von der L&ouml;schung ausgenommen.</p>\n\n<p>&nbsp;</p>\n\n<h3>Google Fonts</h3>\n\n<p>&nbsp;</p>\n\n<p>Wir binden die Schriftarten (&quot;Google Fonts&quot;) des Anbieters Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA, ein. Datenschutzerkl&auml;rung: <a href="https://www.google.com/policies/privacy/" target="_blank">https://www.google.com/policies/privacy/</a>, Opt-Out: <a href="https://adssettings.google.com/authenticated" target="_blank">https://adssettings.google.com/authenticated</a>.</p>\n\n<h1><a href="https://datenschutz-generator.de" rel="nofollow" target="_blank">Erstellt mit Datenschutz-Generator.de von RA Dr. Thomas Schwenke</a></h1>\n\n<h1>&nbsp;</h1>\n\n<h1>Datenschutzerkl&auml;rung</h1>\n\n<p>Wir freuen uns sehr &uuml;ber Ihr Interesse an unserem Unternehmen. Datenschutz hat einen besonders hohen Stellenwert f&uuml;r die Gesch&auml;ftsleitung der Firmenname. Eine Nutzung der Internetseiten der Firmenname ist grunds&auml;tzlich ohne jede Angabe personenbezogener Daten m&ouml;glich. Sofern eine betroffene Person besondere Services unseres Unternehmens &uuml;ber unsere Internetseite in Anspruch nehmen m&ouml;chte, k&ouml;nnte jedoch eine Verarbeitung personenbezogener Daten erforderlich werden. Ist die Verarbeitung personenbezogener Daten erforderlich und besteht f&uuml;r eine solche Verarbeitung keine gesetzliche Grundlage, holen wir generell eine Einwilligung der betroffenen Person ein.</p>\n\n<p>Die Verarbeitung personenbezogener Daten, beispielsweise des Namens, der Anschrift, E-Mail-Adresse oder Telefonnummer einer betroffenen Person, erfolgt stets im Einklang mit der Datenschutz-Grundverordnung und in &Uuml;bereinstimmung mit den f&uuml;r die Firmenname geltenden landesspezifischen Datenschutzbestimmungen. Mittels dieser Datenschutzerkl&auml;rung m&ouml;chte unser Unternehmen die &Ouml;ffentlichkeit &uuml;ber Art, Umfang und Zweck der von uns erhobenen, genutzten und verarbeiteten personenbezogenen Daten informieren. Ferner werden betroffene Personen mittels dieser Datenschutzerkl&auml;rung &uuml;ber die ihnen zustehenden Rechte aufgekl&auml;rt.</p>\n\n<p>Die Firmenname hat als f&uuml;r die Verarbeitung Verantwortlicher zahlreiche technische und organisatorische Ma&szlig;nahmen umgesetzt, um einen m&ouml;glichst l&uuml;ckenlosen Schutz der &uuml;ber diese Internetseite verarbeiteten personenbezogenen Daten sicherzustellen. Dennoch k&ouml;nnen Internetbasierte Daten&uuml;bertragungen grunds&auml;tzlich Sicherheitsl&uuml;cken aufweisen, sodass ein absoluter Schutz nicht gew&auml;hrleistet werden kann. Aus diesem Grund steht es jeder betroffenen Person frei, personenbezogene Daten auch auf alternativen Wegen, beispielsweise telefonisch, an uns zu &uuml;bermitteln.</p>\n\n<h2>1. Begriffsbestimmungen</h2>\n\n<p>Die Datenschutzerkl&auml;rung der Firmenname beruht auf den Begrifflichkeiten, die durch den Europ&auml;ischen Richtlinien- und Verordnungsgeber beim Erlass der Datenschutz-Grundverordnung (DS-GVO) verwendet wurden. Unsere Datenschutzerkl&auml;rung soll sowohl f&uuml;r die &Ouml;ffentlichkeit als auch f&uuml;r unsere Kunden und Gesch&auml;ftspartner einfach lesbar und verst&auml;ndlich sein. Um dies zu gew&auml;hrleisten, m&ouml;chten wir vorab die verwendeten Begrifflichkeiten erl&auml;utern.</p>\n\n<p>Wir verwenden in dieser Datenschutzerkl&auml;rung unter anderem die folgenden Begriffe:</p>\n\n<ul>\n\t<li>\n\t<h3>a)&nbsp;&nbsp;&nbsp; personenbezogene Daten</h3>\n\n\t<p>Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare nat&uuml;rliche Person (im Folgenden &bdquo;betroffene Person&ldquo;) beziehen. Als identifizierbar wird eine nat&uuml;rliche Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung oder zu einem oder mehreren besonderen Merkmalen, die Ausdruck der physischen, physiologischen, genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen Identit&auml;t dieser nat&uuml;rlichen Person sind, identifiziert werden kann.</p>\n\t</li>\n\t<li>\n\t<h3>b)&nbsp;&nbsp;&nbsp; betroffene Person</h3>\n\n\t<p>Betroffene Person ist jede identifizierte oder identifizierbare nat&uuml;rliche Person, deren personenbezogene Daten von dem f&uuml;r die Verarbeitung Verantwortlichen verarbeitet werden.</p>\n\t</li>\n\t<li>\n\t<h3>c)&nbsp;&nbsp;&nbsp; Verarbeitung</h3>\n\n\t<p>Verarbeitung ist jeder mit oder ohne Hilfe automatisierter Verfahren ausgef&uuml;hrte Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten wie das Erheben, das Erfassen, die Organisation, das Ordnen, die Speicherung, die Anpassung oder Ver&auml;nderung, das Auslesen, das Abfragen, die Verwendung, die Offenlegung durch &Uuml;bermittlung, Verbreitung oder eine andere Form der Bereitstellung, den Abgleich oder die Verkn&uuml;pfung, die Einschr&auml;nkung, das L&ouml;schen oder die Vernichtung.</p>\n\t</li>\n\t<li>\n\t<h3>d)&nbsp;&nbsp;&nbsp; Einschr&auml;nkung der Verarbeitung</h3>\n\n\t<p>Einschr&auml;nkung der Verarbeitung ist die Markierung gespeicherter personenbezogener Daten mit dem Ziel, ihre k&uuml;nftige Verarbeitung einzuschr&auml;nken.</p>\n\t</li>\n\t<li>\n\t<h3>e)&nbsp;&nbsp;&nbsp; Profiling</h3>\n\n\t<p>Profiling ist jede Art der automatisierten Verarbeitung personenbezogener Daten, die darin besteht, dass diese personenbezogenen Daten verwendet werden, um bestimmte pers&ouml;nliche Aspekte, die sich auf eine nat&uuml;rliche Person beziehen, zu bewerten, insbesondere, um Aspekte bez&uuml;glich Arbeitsleistung, wirtschaftlicher Lage, Gesundheit, pers&ouml;nlicher Vorlieben, Interessen, Zuverl&auml;ssigkeit, Verhalten, Aufenthaltsort oder Ortswechsel dieser nat&uuml;rlichen Person zu analysieren oder vorherzusagen.</p>\n\t</li>\n\t<li>\n\t<h3>f)&nbsp;&nbsp;&nbsp;&nbsp; Pseudonymisierung</h3>\n\n\t<p>Pseudonymisierung ist die Verarbeitung personenbezogener Daten in einer Weise, auf welche die personenbezogenen Daten ohne Hinzuziehung zus&auml;tzlicher Informationen nicht mehr einer spezifischen betroffenen Person zugeordnet werden k&ouml;nnen, sofern diese zus&auml;tzlichen Informationen gesondert aufbewahrt werden und technischen und organisatorischen Ma&szlig;nahmen unterliegen, die gew&auml;hrleisten, dass die personenbezogenen Daten nicht einer identifizierten oder identifizierbaren nat&uuml;rlichen Person zugewiesen werden.</p>\n\t</li>\n\t<li>\n\t<h3>g)&nbsp;&nbsp;&nbsp; Verantwortlicher oder f&uuml;r die Verarbeitung Verantwortlicher</h3>\n\n\t<p>Verantwortlicher oder f&uuml;r die Verarbeitung Verantwortlicher ist die nat&uuml;rliche oder juristische Person, Beh&ouml;rde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen &uuml;ber die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet. Sind die Zwecke und Mittel dieser Verarbeitung durch das Unionsrecht oder das Recht der Mitgliedstaaten vorgegeben, so kann der Verantwortliche beziehungsweise k&ouml;nnen die bestimmten Kriterien seiner Benennung nach dem Unionsrecht oder dem Recht der Mitgliedstaaten vorgesehen werden.</p>\n\t</li>\n\t<li>\n\t<h3>h)&nbsp;&nbsp;&nbsp; Auftragsverarbeiter</h3>\n\n\t<p>Auftragsverarbeiter ist eine nat&uuml;rliche oder juristische Person, Beh&ouml;rde, Einrichtung oder andere Stelle, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet.</p>\n\t</li>\n\t<li>\n\t<h3>i)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Empf&auml;nger</h3>\n\n\t<p>Empf&auml;nger ist eine nat&uuml;rliche oder juristische Person, Beh&ouml;rde, Einrichtung oder andere Stelle, der personenbezogene Daten offengelegt werden, unabh&auml;ngig davon, ob es sich bei ihr um einen Dritten handelt oder nicht. Beh&ouml;rden, die im Rahmen eines bestimmten Untersuchungsauftrags nach dem Unionsrecht oder dem Recht der Mitgliedstaaten m&ouml;glicherweise personenbezogene Daten erhalten, gelten jedoch nicht als Empf&auml;nger.</p>\n\t</li>\n\t<li>\n\t<h3>j)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dritter</h3>\n\n\t<p>Dritter ist eine nat&uuml;rliche oder juristische Person, Beh&ouml;rde, Einrichtung oder andere Stelle au&szlig;er der betroffenen Person, dem Verantwortlichen, dem Auftragsverarbeiter und den Personen, die unter der unmittelbaren Verantwortung des Verantwortlichen oder des Auftragsverarbeiters befugt sind, die personenbezogenen Daten zu verarbeiten.</p>\n\t</li>\n\t<li>\n\t<h3>k)&nbsp;&nbsp;&nbsp; Einwilligung</h3>\n\n\t<p>Einwilligung ist jede von der betroffenen Person freiwillig f&uuml;r den bestimmten Fall in informierter Weise und unmissverst&auml;ndlich abgegebene Willensbekundung in Form einer Erkl&auml;rung oder einer sonstigen eindeutigen best&auml;tigenden Handlung, mit der die betroffene Person zu verstehen gibt, dass sie mit der Verarbeitung der sie betreffenden personenbezogenen Daten einverstanden ist.</p>\n\t</li>\n</ul>\n\n<h2>2. Name und Anschrift des f&uuml;r die Verarbeitung Verantwortlichen</h2>\n\n<p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung, sonstiger in den Mitgliedstaaten der Europ&auml;ischen Union geltenden Datenschutzgesetze und anderer Bestimmungen mit datenschutzrechtlichem Charakter ist die:</p>\n\n<p>Firmenname</p>\n\n<p>Donaustra&szlig;e 22</p>\n\n<p>94486 Oserhofen</p>\n\n<p>Deutschland</p>\n\n<p>Tel.: 016099746339</p>\n\n<p>E-Mail: dreampresent.development@gmail.com</p>\n\n<p>Website: www.dreampresent.de</p>\n\n<h2>3. Cookies</h2>\n\n<p>Die Internetseiten der Firmenname verwenden Cookies. Cookies sind Textdateien, welche &uuml;ber einen Internetbrowser auf einem Computersystem abgelegt und gespeichert werden.</p>\n\n<p>Zahlreiche Internetseiten und Server verwenden Cookies. Viele Cookies enthalten eine sogenannte Cookie-ID. Eine Cookie-ID ist eine eindeutige Kennung des Cookies. Sie besteht aus einer Zeichenfolge, durch welche Internetseiten und Server dem konkreten Internetbrowser zugeordnet werden k&ouml;nnen, in dem das Cookie gespeichert wurde. Dies erm&ouml;glicht es den besuchten Internetseiten und Servern, den individuellen Browser der betroffenen Person von anderen Internetbrowsern, die andere Cookies enthalten, zu unterscheiden. Ein bestimmter Internetbrowser kann &uuml;ber die eindeutige Cookie-ID wiedererkannt und identifiziert werden.</p>\n\n<p>Durch den Einsatz von Cookies kann die Firmenname den Nutzern dieser Internetseite nutzerfreundlichere Services bereitstellen, die ohne die Cookie-Setzung nicht m&ouml;glich w&auml;ren.</p>\n\n<p>Mittels eines Cookies k&ouml;nnen die Informationen und Angebote auf unserer Internetseite im Sinne des Benutzers optimiert werden. Cookies erm&ouml;glichen uns, wie bereits erw&auml;hnt, die Benutzer unserer Internetseite wiederzuerkennen. Zweck dieser Wiedererkennung ist es, den Nutzern die Verwendung unserer Internetseite zu erleichtern. Der Benutzer einer Internetseite, die Cookies verwendet, muss beispielsweise nicht bei jedem Besuch der Internetseite erneut seine Zugangsdaten eingeben, weil dies von der Internetseite und dem auf dem Computersystem des Benutzers abgelegten Cookie &uuml;bernommen wird. Ein weiteres Beispiel ist das Cookie eines Warenkorbes im Online-Shop. Der Online-Shop merkt sich die Artikel, die ein Kunde in den virtuellen Warenkorb gelegt hat, &uuml;ber ein Cookie.</p>\n\n<p>Die betroffene Person kann die Setzung von Cookies durch unsere Internetseite jederzeit mittels einer entsprechenden Einstellung des genutzten Internetbrowsers verhindern und damit der Setzung von Cookies dauerhaft widersprechen. Ferner k&ouml;nnen bereits gesetzte Cookies jederzeit &uuml;ber einen Internetbrowser oder andere Softwareprogramme gel&ouml;scht werden. Dies ist in allen g&auml;ngigen Internetbrowsern m&ouml;glich. Deaktiviert die betroffene Person die Setzung von Cookies in dem genutzten Internetbrowser, sind unter Umst&auml;nden nicht alle Funktionen unserer Internetseite vollumf&auml;nglich nutzbar.</p>\n\n<h2>4. Erfassung von allgemeinen Daten und Informationen</h2>\n\n<p>Die Internetseite der Firmenname erfasst mit jedem Aufruf der Internetseite durch eine betroffene Person oder ein automatisiertes System eine Reihe von allgemeinen Daten und Informationen. Diese allgemeinen Daten und Informationen werden in den Logfiles des Servers gespeichert. Erfasst werden k&ouml;nnen die (1) verwendeten Browsertypen und Versionen, (2) das vom zugreifenden System verwendete Betriebssystem, (3) die Internetseite, von welcher ein zugreifendes System auf unsere Internetseite gelangt (sogenannte Referrer), (4) die Unterwebseiten, welche &uuml;ber ein zugreifendes System auf unserer Internetseite angesteuert werden, (5) das Datum und die Uhrzeit eines Zugriffs auf die Internetseite, (6) eine Internet-Protokoll-Adresse (IP-Adresse), (7) der Internet-Service-Provider des zugreifenden Systems und (8) sonstige &auml;hnliche Daten und Informationen, die der Gefahrenabwehr im Falle von Angriffen auf unsere informationstechnologischen Systeme dienen.</p>\n\n<p>Bei der Nutzung dieser allgemeinen Daten und Informationen zieht die Firmenname keine R&uuml;ckschl&uuml;sse auf die betroffene Person. Diese Informationen werden vielmehr ben&ouml;tigt, um (1) die Inhalte unserer Internetseite korrekt auszuliefern, (2) die Inhalte unserer Internetseite sowie die Werbung f&uuml;r diese zu optimieren, (3) die dauerhafte Funktionsf&auml;higkeit unserer informationstechnologischen Systeme und der Technik unserer Internetseite zu gew&auml;hrleisten sowie (4) um Strafverfolgungsbeh&ouml;rden im Falle eines Cyberangriffes die zur Strafverfolgung notwendigen Informationen bereitzustellen. Diese anonym erhobenen Daten und Informationen werden durch die Firmenname daher einerseits statistisch und ferner mit dem Ziel ausgewertet, den Datenschutz und die Datensicherheit in unserem Unternehmen zu erh&ouml;hen, um letztlich ein optimales Schutzniveau f&uuml;r die von uns verarbeiteten personenbezogenen Daten sicherzustellen. Die anonymen Daten der Server-Logfiles werden getrennt von allen durch eine betroffene Person angegebenen personenbezogenen Daten gespeichert.</p>\n\n<h2>5. Routinem&auml;&szlig;ige L&ouml;schung und Sperrung von personenbezogenen Daten</h2>\n\n<p>Der f&uuml;r die Verarbeitung Verantwortliche verarbeitet und speichert personenbezogene Daten der betroffenen Person nur f&uuml;r den Zeitraum, der zur Erreichung des Speicherungszwecks erforderlich ist oder sofern dies durch den Europ&auml;ischen Richtlinien- und Verordnungsgeber oder einen anderen Gesetzgeber in Gesetzen oder Vorschriften, welchen der f&uuml;r die Verarbeitung Verantwortliche unterliegt, vorgesehen wurde.</p>\n\n<p>Entf&auml;llt der Speicherungszweck oder l&auml;uft eine vom Europ&auml;ischen Richtlinien- und Verordnungsgeber oder einem anderen zust&auml;ndigen Gesetzgeber vorgeschriebene Speicherfrist ab, werden die personenbezogenen Daten routinem&auml;&szlig;ig und entsprechend den gesetzlichen Vorschriften gesperrt oder gel&ouml;scht.</p>\n\n<h2>6. Rechte der betroffenen Person</h2>\n\n<ul>\n\t<li>\n\t<h3>a)&nbsp;&nbsp;&nbsp; Recht auf Best&auml;tigung</h3>\n\n\t<p>Jede betroffene Person hat das vom Europ&auml;ischen Richtlinien- und Verordnungsgeber einger&auml;umte Recht, von dem f&uuml;r die Verarbeitung Verantwortlichen eine Best&auml;tigung dar&uuml;ber zu verlangen, ob sie betreffende personenbezogene Daten verarbeitet werden. M&ouml;chte eine betroffene Person dieses Best&auml;tigungsrecht in Anspruch nehmen, kann sie sich hierzu jederzeit an einen Mitarbeiter des f&uuml;r die Verarbeitung Verantwortlichen wenden.</p>\n\t</li>\n\t<li>\n\t<h3>b)&nbsp;&nbsp;&nbsp; Recht auf Auskunft</h3>\n\n\t<p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ&auml;ischen Richtlinien- und Verordnungsgeber gew&auml;hrte Recht, jederzeit von dem f&uuml;r die Verarbeitung Verantwortlichen unentgeltliche Auskunft &uuml;ber die zu seiner Person gespeicherten personenbezogenen Daten und eine Kopie dieser Auskunft zu erhalten. Ferner hat der Europ&auml;ische Richtlinien- und Verordnungsgeber der betroffenen Person Auskunft &uuml;ber folgende Informationen zugestanden:</p>\n\n\t<ul>\n\t\t<li>die Verarbeitungszwecke</li>\n\t\t<li>die Kategorien personenbezogener Daten, die verarbeitet werden</li>\n\t\t<li>die Empf&auml;nger oder Kategorien von Empf&auml;ngern, gegen&uuml;ber denen die personenbezogenen Daten offengelegt worden sind oder noch offengelegt werden, insbesondere bei Empf&auml;ngern in Drittl&auml;ndern oder bei internationalen Organisationen</li>\n\t\t<li>falls m&ouml;glich die geplante Dauer, f&uuml;r die die personenbezogenen Daten gespeichert werden, oder, falls dies nicht m&ouml;glich ist, die Kriterien f&uuml;r die Festlegung dieser Dauer</li>\n\t\t<li>das Bestehen eines Rechts auf Berichtigung oder L&ouml;schung der sie betreffenden personenbezogenen Daten oder auf Einschr&auml;nkung der Verarbeitung durch den Verantwortlichen oder eines Widerspruchsrechts gegen diese Verarbeitung</li>\n\t\t<li>das Bestehen eines Beschwerderechts bei einer Aufsichtsbeh&ouml;rde</li>\n\t\t<li>wenn die personenbezogenen Daten nicht bei der betroffenen Person erhoben werden: Alle verf&uuml;gbaren Informationen &uuml;ber die Herkunft der Daten</li>\n\t\t<li>das Bestehen einer automatisierten Entscheidungsfindung einschlie&szlig;lich Profiling gem&auml;&szlig; Artikel 22 Abs.1 und 4 DS-GVO und &mdash; zumindest in diesen F&auml;llen &mdash; aussagekr&auml;ftige Informationen &uuml;ber die involvierte Logik sowie die Tragweite und die angestrebten Auswirkungen einer derartigen Verarbeitung f&uuml;r die betroffene Person</li>\n\t</ul>\n\n\t<p>Ferner steht der betroffenen Person ein Auskunftsrecht dar&uuml;ber zu, ob personenbezogene Daten an ein Drittland oder an eine internationale Organisation &uuml;bermittelt wurden. Sofern dies der Fall ist, so steht der betroffenen Person im &Uuml;brigen das Recht zu, Auskunft &uuml;ber die geeigneten Garantien im Zusammenhang mit der &Uuml;bermittlung zu erhalten.</p>\n\n\t<p>M&ouml;chte eine betroffene Person dieses Auskunftsrecht in Anspruch nehmen, kann sie sich hierzu jederzeit an einen Mitarbeiter des f&uuml;r die Verarbeitung Verantwortlichen wenden.</p>\n\t</li>\n\t<li>\n\t<h3>c)&nbsp;&nbsp;&nbsp; Recht auf Berichtigung</h3>\n\n\t<p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ&auml;ischen Richtlinien- und Verordnungsgeber gew&auml;hrte Recht, die unverz&uuml;gliche Berichtigung sie betreffender unrichtiger personenbezogener Daten zu verlangen. Ferner steht der betroffenen Person das Recht zu, unter Ber&uuml;cksichtigung der Zwecke der Verarbeitung, die Vervollst&auml;ndigung unvollst&auml;ndiger personenbezogener Daten &mdash; auch mittels einer erg&auml;nzenden Erkl&auml;rung &mdash; zu verlangen.</p>\n\n\t<p>M&ouml;chte eine betroffene Person dieses Berichtigungsrecht in Anspruch nehmen, kann sie sich hierzu jederzeit an einen Mitarbeiter des f&uuml;r die Verarbeitung Verantwortlichen wenden.</p>\n\t</li>\n\t<li>\n\t<h3>d)&nbsp;&nbsp;&nbsp; Recht auf L&ouml;schung (Recht auf Vergessen werden)</h3>\n\n\t<p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ&auml;ischen Richtlinien- und Verordnungsgeber gew&auml;hrte Recht, von dem Verantwortlichen zu verlangen, dass die sie betreffenden personenbezogenen Daten unverz&uuml;glich gel&ouml;scht werden, sofern einer der folgenden Gr&uuml;nde zutrifft und soweit die Verarbeitung nicht erforderlich ist:</p>\n\n\t<ul>\n\t\t<li>Die personenbezogenen Daten wurden f&uuml;r solche Zwecke erhoben oder auf sonstige Weise verarbeitet, f&uuml;r welche sie nicht mehr notwendig sind.</li>\n\t\t<li>Die betroffene Person widerruft ihre Einwilligung, auf die sich die Verarbeitung gem&auml;&szlig; Art. 6 Abs. 1 Buchstabe a DS-GVO oder Art. 9 Abs. 2 Buchstabe a DS-GVO st&uuml;tzte, und es fehlt an einer anderweitigen Rechtsgrundlage f&uuml;r die Verarbeitung.</li>\n\t\t<li>Die betroffene Person legt gem&auml;&szlig; Art. 21 Abs. 1 DS-GVO Widerspruch gegen die Verarbeitung ein, und es liegen keine vorrangigen berechtigten Gr&uuml;nde f&uuml;r die Verarbeitung vor, oder die betroffene Person legt gem&auml;&szlig; Art. 21 Abs. 2 DS-GVO Widerspruch gegen die Verarbeitung ein.</li>\n\t\t<li>Die personenbezogenen Daten wurden unrechtm&auml;&szlig;ig verarbeitet.</li>\n\t\t<li>Die L&ouml;schung der personenbezogenen Daten ist zur Erf&uuml;llung einer rechtlichen Verpflichtung nach dem Unionsrecht oder dem Recht der Mitgliedstaaten erforderlich, dem der Verantwortliche unterliegt.</li>\n\t\t<li>Die personenbezogenen Daten wurden in Bezug auf angebotene Dienste der Informationsgesellschaft gem&auml;&szlig; Art. 8 Abs. 1 DS-GVO erhoben.</li>\n\t</ul>\n\n\t<p>Sofern einer der oben genannten Gr&uuml;nde zutrifft und eine betroffene Person die L&ouml;schung von personenbezogenen Daten, die bei der Firmenname gespeichert sind, veranlassen m&ouml;chte, kann sie sich hierzu jederzeit an einen Mitarbeiter des f&uuml;r die Verarbeitung Verantwortlichen wenden. Der Mitarbeiter der Firmenname wird veranlassen, dass dem L&ouml;schverlangen unverz&uuml;glich nachgekommen wird.</p>\n\n\t<p>Wurden die personenbezogenen Daten von der Firmenname &ouml;ffentlich gemacht und ist unser Unternehmen als Verantwortlicher gem&auml;&szlig; Art. 17 Abs. 1 DS-GVO zur L&ouml;schung der personenbezogenen Daten verpflichtet, so trifft die Firmenname unter Ber&uuml;cksichtigung der verf&uuml;gbaren Technologie und der Implementierungskosten angemessene Ma&szlig;nahmen, auch technischer Art, um andere f&uuml;r die Datenverarbeitung Verantwortliche, welche die ver&ouml;ffentlichten personenbezogenen Daten verarbeiten, dar&uuml;ber in Kenntnis zu setzen, dass die betroffene Person von diesen anderen f&uuml;r die Datenverarbeitung Verantwortlichen die L&ouml;schung s&auml;mtlicher Links zu diesen personenbezogenen Daten oder von Kopien oder Replikationen dieser personenbezogenen Daten verlangt hat, soweit die Verarbeitung nicht erforderlich ist. Der Mitarbeiter der Firmenname wird im Einzelfall das Notwendige veranlassen.</p>\n\t</li>\n\t<li>\n\t<h3>e)&nbsp;&nbsp;&nbsp; Recht auf Einschr&auml;nkung der Verarbeitung</h3>\n\n\t<p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ&auml;ischen Richtlinien- und Verordnungsgeber gew&auml;hrte Recht, von dem Verantwortlichen die Einschr&auml;nkung der Verarbeitung zu verlangen, wenn eine der folgenden Voraussetzungen gegeben ist:</p>\n\n\t<ul>\n\t\t<li>Die Richtigkeit der personenbezogenen Daten wird von der betroffenen Person bestritten, und zwar f&uuml;r eine Dauer, die es dem Verantwortlichen erm&ouml;glicht, die Richtigkeit der personenbezogenen Daten zu &uuml;berpr&uuml;fen.</li>\n\t\t<li>Die Verarbeitung ist unrechtm&auml;&szlig;ig, die betroffene Person lehnt die L&ouml;schung der personenbezogenen Daten ab und verlangt stattdessen die Einschr&auml;nkung der Nutzung der personenbezogenen Daten.</li>\n\t\t<li>Der Verantwortliche ben&ouml;tigt die personenbezogenen Daten f&uuml;r die Zwecke der Verarbeitung nicht l&auml;nger, die betroffene Person ben&ouml;tigt sie jedoch zur Geltendmachung, Aus&uuml;bung oder Verteidigung von Rechtsanspr&uuml;chen.</li>\n\t\t<li>Die betroffene Person hat Widerspruch gegen die Verarbeitung gem. Art. 21 Abs. 1 DS-GVO eingelegt und es steht noch nicht fest, ob die berechtigten Gr&uuml;nde des Verantwortlichen gegen&uuml;ber denen der betroffenen Person &uuml;berwiegen.</li>\n\t</ul>\n\n\t<p>Sofern eine der oben genannten Voraussetzungen gegeben ist und eine betroffene Person die Einschr&auml;nkung von personenbezogenen Daten, die bei der Firmenname gespeichert sind, verlangen m&ouml;chte, kann sie sich hierzu jederzeit an einen Mitarbeiter des f&uuml;r die Verarbeitung Verantwortlichen wenden. Der Mitarbeiter der Firmenname wird die Einschr&auml;nkung der Verarbeitung veranlassen.</p>\n\t</li>\n\t<li>\n\t<h3>f)&nbsp;&nbsp;&nbsp;&nbsp; Recht auf Daten&uuml;bertragbarkeit</h3>\n\n\t<p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ&auml;ischen Richtlinien- und Verordnungsgeber gew&auml;hrte Recht, die sie betreffenden personenbezogenen Daten, welche durch die betroffene Person einem Verantwortlichen bereitgestellt wurden, in einem strukturierten, g&auml;ngigen und maschinenlesbaren Format zu erhalten. Sie hat au&szlig;erdem das Recht, diese Daten einem anderen Verantwortlichen ohne Behinderung durch den Verantwortlichen, dem die personenbezogenen Daten bereitgestellt wurden, zu &uuml;bermitteln, sofern die Verarbeitung auf der Einwilligung gem&auml;&szlig; Art. 6 Abs. 1 Buchstabe a DS-GVO oder Art. 9 Abs. 2 Buchstabe a DS-GVO oder auf einem Vertrag gem&auml;&szlig; Art. 6 Abs. 1 Buchstabe b DS-GVO beruht und die Verarbeitung mithilfe automatisierter Verfahren erfolgt, sofern die Verarbeitung nicht f&uuml;r die Wahrnehmung einer Aufgabe erforderlich ist, die im &ouml;ffentlichen Interesse liegt oder in Aus&uuml;bung &ouml;ffentlicher Gewalt erfolgt, welche dem Verantwortlichen &uuml;bertragen wurde.</p>\n\n\t<p>Ferner hat die betroffene Person bei der Aus&uuml;bung ihres Rechts auf Daten&uuml;bertragbarkeit gem&auml;&szlig; Art. 20 Abs. 1 DS-GVO das Recht, zu erwirken, dass die personenbezogenen Daten direkt von einem Verantwortlichen an einen anderen Verantwortlichen &uuml;bermittelt werden, soweit dies technisch machbar ist und sofern hiervon nicht die Rechte und Freiheiten anderer Personen beeintr&auml;chtigt werden.</p>\n\n\t<p>Zur Geltendmachung des Rechts auf Daten&uuml;bertragbarkeit kann sich die betroffene Person jederzeit an einen Mitarbeiter der Firmenname wenden.</p>\n\t</li>\n\t<li>\n\t<h3>g)&nbsp;&nbsp;&nbsp; Recht auf Widerspruch</h3>\n\n\t<p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ&auml;ischen Richtlinien- und Verordnungsgeber gew&auml;hrte Recht, aus Gr&uuml;nden, die sich aus ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung sie betreffender personenbezogener Daten, die aufgrund von Art. 6 Abs. 1 Buchstaben e oder f DS-GVO erfolgt, Widerspruch einzulegen. Dies gilt auch f&uuml;r ein auf diese Bestimmungen gest&uuml;tztes Profiling.</p>\n\n\t<p>Die Firmenname verarbeitet die personenbezogenen Daten im Falle des Widerspruchs nicht mehr, es sei denn, wir k&ouml;nnen zwingende schutzw&uuml;rdige Gr&uuml;nde f&uuml;r die Verarbeitung nachweisen, die den Interessen, Rechten und Freiheiten der betroffenen Person &uuml;berwiegen, oder die Verarbeitung dient der Geltendmachung, Aus&uuml;bung oder Verteidigung von Rechtsanspr&uuml;chen.</p>\n\n\t<p>Verarbeitet die Firmenname personenbezogene Daten, um Direktwerbung zu betreiben, so hat die betroffene Person das Recht, jederzeit Widerspruch gegen die Verarbeitung der personenbezogenen Daten zum Zwecke derartiger Werbung einzulegen. Dies gilt auch f&uuml;r das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht. Widerspricht die betroffene Person gegen&uuml;ber der Firmenname der Verarbeitung f&uuml;r Zwecke der Direktwerbung, so wird die Firmenname die personenbezogenen Daten nicht mehr f&uuml;r diese Zwecke verarbeiten.</p>\n\n\t<p>Zudem hat die betroffene Person das Recht, aus Gr&uuml;nden, die sich aus ihrer besonderen Situation ergeben, gegen die sie betreffende Verarbeitung personenbezogener Daten, die bei der Firmenname zu wissenschaftlichen oder historischen Forschungszwecken oder zu statistischen Zwecken gem&auml;&szlig; Art. 89 Abs. 1 DS-GVO erfolgen, Widerspruch einzulegen, es sei denn, eine solche Verarbeitung ist zur Erf&uuml;llung einer im &ouml;ffentlichen Interesse liegenden Aufgabe erforderlich.</p>\n\n\t<p>Zur Aus&uuml;bung des Rechts auf Widerspruch kann sich die betroffene Person direkt jeden Mitarbeiter der Firmenname oder einen anderen Mitarbeiter wenden. Der betroffenen Person steht es ferner frei, im Zusammenhang mit der Nutzung von Diensten der Informationsgesellschaft, ungeachtet der Richtlinie 2002/58/EG, ihr Widerspruchsrecht mittels automatisierter Verfahren auszu&uuml;ben, bei denen technische Spezifikationen verwendet werden.</p>\n\t</li>\n\t<li>\n\t<h3>h)&nbsp;&nbsp;&nbsp; Automatisierte Entscheidungen im Einzelfall einschlie&szlig;lich Profiling</h3>\n\n\t<p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ&auml;ischen Richtlinien- und Verordnungsgeber gew&auml;hrte Recht, nicht einer ausschlie&szlig;lich auf einer automatisierten Verarbeitung &mdash; einschlie&szlig;lich Profiling &mdash; beruhenden Entscheidung unterworfen zu werden, die ihr gegen&uuml;ber rechtliche Wirkung entfaltet oder sie in &auml;hnlicher Weise erheblich beeintr&auml;chtigt, sofern die Entscheidung (1) nicht f&uuml;r den Abschluss oder die Erf&uuml;llung eines Vertrags zwischen der betroffenen Person und dem Verantwortlichen erforderlich ist, oder (2) aufgrund von Rechtsvorschriften der Union oder der Mitgliedstaaten, denen der Verantwortliche unterliegt, zul&auml;ssig ist und diese Rechtsvorschriften angemessene Ma&szlig;nahmen zur Wahrung der Rechte und Freiheiten sowie der berechtigten Interessen der betroffenen Person enthalten oder (3) mit ausdr&uuml;cklicher Einwilligung der betroffenen Person erfolgt.</p>\n\n\t<p>Ist die Entscheidung (1) f&uuml;r den Abschluss oder die Erf&uuml;llung eines Vertrags zwischen der betroffenen Person und dem Verantwortlichen erforderlich oder (2) erfolgt sie mit ausdr&uuml;cklicher Einwilligung der betroffenen Person, trifft die Firmenname angemessene Ma&szlig;nahmen, um die Rechte und Freiheiten sowie die berechtigten Interessen der betroffenen Person zu wahren, wozu mindestens das Recht auf Erwirkung des Eingreifens einer Person seitens des Verantwortlichen, auf Darlegung des eigenen Standpunkts und auf Anfechtung der Entscheidung geh&ouml;rt.</p>\n\n\t<p>M&ouml;chte die betroffene Person Rechte mit Bezug auf automatisierte Entscheidungen geltend machen, kann sie sich hierzu jederzeit an einen Mitarbeiter des f&uuml;r die Verarbeitung Verantwortlichen wenden.</p>\n\t</li>\n\t<li>\n\t<h3>i)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Recht auf Widerruf einer datenschutzrechtlichen Einwilligung</h3>\n\n\t<p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ&auml;ischen Richtlinien- und Verordnungsgeber gew&auml;hrte Recht, eine Einwilligung zur Verarbeitung personenbezogener Daten jederzeit zu widerrufen.</p>\n\n\t<p>M&ouml;chte die betroffene Person ihr Recht auf Widerruf einer Einwilligung geltend machen, kann sie sich hierzu jederzeit an einen Mitarbeiter des f&uuml;r die Verarbeitung Verantwortlichen wenden.</p>\n\t</li>\n</ul>\n\n<h2>7. Datenschutzbestimmungen zu Einsatz und Verwendung von affilinet</h2>\n\n<p>Der f&uuml;r die Verarbeitung Verantwortliche hat auf dieser Internetseite Komponenten des Unternehmens affilinet integriert. Affilinet ist ein deutsches Affiliate-Netzwerk, welches Affiliate-Marketing anbietet.</p>\n\n<p>Affiliate-Marketing ist eine Internetgest&uuml;tzte Vertriebsform, die es kommerziellen Betreibern von Internetseiten, den sogenannten Merchants oder Advertisern, erm&ouml;glicht, Werbung, die meist &uuml;ber Klick- oder Sale-Provisionen verg&uuml;tet wird, auf Internetseiten Dritter, also bei Vertriebspartnern, die auch Affiliates oder Publisher genannt werden, einzublenden. Der Merchant stellt &uuml;ber das Affiliate-Netzwerk ein Werbemittel, also einen Werbebanner oder andere geeignete Mittel der Internetwerbung, zur Verf&uuml;gung, welche in der Folge von einem Affiliate auf eigenen Internetseiten eingebunden oder &uuml;ber sonstige Kan&auml;le, wie etwa das Keyword-Advertising oder E-Mail-Marketing, beworben werden.</p>\n\n<p>Betreibergesellschaft von Affilinet ist die affilinet GmbH, Sapporobogen 6-8, 80637 M&uuml;nchen, Deutschland.</p>\n\n<p>Affilinet setzt ein Cookie auf dem informationstechnologischen System der betroffenen Person. Was Cookies sind, wurde oben bereits erl&auml;utert. Das Tracking-Cookie von Affilinet speichert keinerlei personenbezogene Daten. Gespeichert werden lediglich die Identifikationsnummer des Affiliate, also des den potentiellen Kunden vermittelnden Partners, sowie die Ordnungsnummer des Besuchers einer Internetseite und des angeklickten Werbemittels. Zweck der Speicherung dieser Daten ist die Abwicklung von Provisionszahlungen zwischen einem Merchant und dem Affiliate, welche &uuml;ber das Affiliate-Netzwerk, also Affilinet, abgewickelt werden.</p>\n\n<p>Die betroffene Person kann die Setzung von Cookies durch unsere Internetseite, wie oben bereits dargestellt, jederzeit mittels einer entsprechenden Einstellung des genutzten Internetbrowsers verhindern und damit der Setzung von Cookies dauerhaft widersprechen. Eine solche Einstellung des genutzten Internetbrowsers w&uuml;rde auch verhindern, dass Affilinet ein Cookie auf dem informationstechnologischen System der betroffenen Person setzt. Zudem k&ouml;nnen von Affilinet bereits gesetzte Cookies jederzeit &uuml;ber einen Internetbrowser oder andere Softwareprogramme gel&ouml;scht werden.</p>\n\n<p>Die geltenden Datenschutzbestimmungen von Affilinet k&ouml;nnen unter https://www.affili.net/de/footeritem/datenschutz abgerufen werden.</p>\n\n<h2>8. Datenschutzbestimmungen zu Einsatz und Verwendung von Funktionen des Amazon-Partnerprogramms</h2>\n\n<p>Der f&uuml;r die Verarbeitung Verantwortliche hat als Teilnehmer des Amazon-Partnerprogramms auf dieser Internetseite Amazon-Komponenten integriert. Die Amazon-Komponenten wurden von Amazon mit dem Ziel konzipiert, Kunden &uuml;ber Werbeanzeigen auf unterschiedliche Internetseiten der Amazon-Gruppe, insbesondere auf Amazon.co.uk, Local.Amazon.co.uk, Amazon.de, BuyVIP.com, Amazon.fr, Amazon.it und Amazon.es. BuyVIP.com gegen Zahlung einer Provision zu vermitteln. Der f&uuml;r die Verarbeitung Verantwortliche kann durch die Nutzung der Amazon-Komponenten Werbeeinnahmen generieren.</p>\n\n<p>Betreibergesellschaft dieser Amazon-Komponenten ist die Amazon EU S.&agrave;.r.l, 5 Rue Plaetis, L-2338 Luxembourg, Luxemburg.</p>\n\n<p>Amazon setzt ein Cookie auf dem informationstechnologischen System der betroffenen Person. Was Cookies sind, wurde oben bereits erl&auml;utert. Durch jeden einzelnen Aufruf einer der Einzelseiten dieser Internetseite, die durch den f&uuml;r die Verarbeitung Verantwortlichen betrieben wird und auf welcher eine Amazon-Komponente integriert wurde, wird der Internetbrowser auf dem informationstechnologischen System der betroffenen Person automatisch durch die jeweilige Amazon-Komponente veranlasst, Daten zum Zwecke der Online-Werbung und der Abrechnung von Provisionen an Amazon zu &uuml;bermitteln. Im Rahmen dieses technischen Verfahrens erh&auml;lt Amazon Kenntnis &uuml;ber personenbezogene Daten, die Amazon dazu dienen, die Herkunft von bei Amazon eingehenden Bestellungen nachzuvollziehen und in der Folge eine Provisionsabrechnung zu erm&ouml;glichen. Amazon kann unter anderem nachvollziehen, dass die betroffene Person einen Partnerlink auf unserer Internetseite angeklickt hat.</p>\n\n<p>Die betroffene Person kann die Setzung von Cookies durch unsere Internetseite, wie oben bereits dargestellt, jederzeit mittels einer entsprechenden Einstellung des genutzten Internetbrowsers verhindern und damit der Setzung von Cookies dauerhaft widersprechen. Eine solche Einstellung des genutzten Internetbrowsers w&uuml;rde auch verhindern, dass Amazon ein Cookie auf dem informationstechnologischen System der betroffenen Person setzt. Zudem k&ouml;nnen von Amazon bereits gesetzte Cookies jederzeit &uuml;ber einen Internetbrowser oder andere Softwareprogramme gel&ouml;scht werden.</p>\n\n<p>Weitere Informationen und die geltenden Datenschutzbestimmungen von Amazon k&ouml;nnen unter https://www.amazon.de/gp/help/customer/display.html?nodeId=3312401 abgerufen werden.</p>\n\n<h2>9. Datenschutzbestimmungen zu Einsatz und Verwendung von Bloglovin</h2>\n\n<p>Der f&uuml;r die Verarbeitung Verantwortliche hat auf dieser Internetseite Komponenten von Bloglovin integriert. Bloglovin ist eine Online-Plattform, welche den Nutzern die Organisation ihrer Lieblingsblogs erm&ouml;glicht. Ein Blog ist ein auf einer Internetseite gef&uuml;hrtes, in der Regel &ouml;ffentlich einsehbares Portal, in welchem eine oder mehrere Personen, die Blogger oder Weblogger genannt werden, Artikel posten oder Gedanken in sogenannten Blogposts niederschreiben k&ouml;nnen.</p>\n\n<p>Betreibergesellschaft von Bloglovin ist die Bloglovin Inc., 25 Broadway, New York, NY 10004, USA.</p>\n\n<p>Durch jeden Aufruf einer der Einzelseiten dieser Internetseite, die durch den f&uuml;r die Verarbeitung Verantwortlichen betrieben wird und auf welcher eine Bloglovin-Komponente integriert wurde, wird der Internetbrowser auf dem informationstechnologischen System der betroffenen Person automatisch durch die jeweilige Bloglovin-Komponente veranlasst, eine Darstellung der entsprechenden Bloglovin-Komponente von Bloglovin herunterzuladen. Im Rahmen dieses technischen Verfahrens erh&auml;lt Bloglovin Kenntnis dar&uuml;ber, welche konkrete Unterseite unserer Internetseite durch die betroffene Person besucht wird.</p>\n\n<p>Sofern die betroffene Person gleichzeitig bei Bloglovin eingeloggt ist, erkennt Bloglovin mit jedem Aufruf unserer Internetseite durch die betroffene Person und w&auml;hrend der gesamten Dauer des jeweiligen Aufenthaltes auf unserer Internetseite, welche konkrete Unterseite unserer Internetseite die betroffene Person besucht. Diese Informationen werden durch die Bloglovin-Komponente gesammelt und durch Bloglovin dem jeweiligen Bloglovin-Account der betroffenen Person zugeordnet. Bet&auml;tigt die betroffene Person den auf unserer Internetseite integrierten Bloglovin-Button, so wird diese Information an Bloglovin &uuml;bermittelt. Der &Uuml;bermittlung derartiger Informationen hat die betroffene Person gegen&uuml;ber Bloglovin bereits zugestimmt.</p>\n\n<p>Weitere Informationen und die geltenden Datenschutzbestimmungen von Bloglovin k&ouml;nnen unter https://www.bloglovin.com/tos abgerufen werden.</p>\n\n<h2>10. Rechtsgrundlage der Verarbeitung</h2>\n\n<p>Art. 6 I lit. a DS-GVO dient unserem Unternehmen als Rechtsgrundlage f&uuml;r Verarbeitungsvorg&auml;nge, bei denen wir eine Einwilligung f&uuml;r einen bestimmten Verarbeitungszweck einholen. Ist die Verarbeitung personenbezogener Daten zur Erf&uuml;llung eines Vertrags, dessen Vertragspartei die betroffene Person ist, erforderlich, wie dies beispielsweise bei Verarbeitungsvorg&auml;ngen der Fall ist, die f&uuml;r eine Lieferung von Waren oder die Erbringung einer sonstigen Leistung oder Gegenleistung notwendig sind, so beruht die Verarbeitung auf Art. 6 I lit. b DS-GVO. Gleiches gilt f&uuml;r solche Verarbeitungsvorg&auml;nge die zur Durchf&uuml;hrung vorvertraglicher Ma&szlig;nahmen erforderlich sind, etwa in F&auml;llen von Anfragen zur unseren Produkten oder Leistungen. Unterliegt unser Unternehmen einer rechtlichen Verpflichtung durch welche eine Verarbeitung von personenbezogenen Daten erforderlich wird, wie beispielsweise zur Erf&uuml;llung steuerlicher Pflichten, so basiert die Verarbeitung auf Art. 6 I lit. c DS-GVO. In seltenen F&auml;llen k&ouml;nnte die Verarbeitung von personenbezogenen Daten erforderlich werden, um lebenswichtige Interessen der betroffenen Person oder einer anderen nat&uuml;rlichen Person zu sch&uuml;tzen. Dies w&auml;re beispielsweise der Fall, wenn ein Besucher in unserem Betrieb verletzt werden w&uuml;rde und daraufhin sein Name, sein Alter, seine Krankenkassendaten oder sonstige lebenswichtige Informationen an einen Arzt, ein Krankenhaus oder sonstige Dritte weitergegeben werden m&uuml;ssten. Dann w&uuml;rde die Verarbeitung auf Art. 6 I lit. d DS-GVO beruhen. Letztlich k&ouml;nnten Verarbeitungsvorg&auml;nge auf Art. 6 I lit. f DS-GVO beruhen. Auf dieser Rechtsgrundlage basieren Verarbeitungsvorg&auml;nge, die von keiner der vorgenannten Rechtsgrundlagen erfasst werden, wenn die Verarbeitung zur Wahrung eines berechtigten Interesses unseres Unternehmens oder eines Dritten erforderlich ist, sofern die Interessen, Grundrechte und Grundfreiheiten des Betroffenen nicht &uuml;berwiegen. Solche Verarbeitungsvorg&auml;nge sind uns insbesondere deshalb gestattet, weil sie durch den Europ&auml;ischen Gesetzgeber besonders erw&auml;hnt wurden. Er vertrat insoweit die Auffassung, dass ein berechtigtes Interesse anzunehmen sein k&ouml;nnte, wenn die betroffene Person ein Kunde des Verantwortlichen ist (Erw&auml;gungsgrund 47 Satz 2 DS-GVO).</p>\n\n<h2>11. Berechtigte Interessen an der Verarbeitung, die von dem Verantwortlichen oder einem Dritten verfolgt werden</h2>\n\n<p>Basiert die Verarbeitung personenbezogener Daten auf Artikel 6 I lit. f DS-GVO ist unser berechtigtes Interesse die Durchf&uuml;hrung unserer Gesch&auml;ftst&auml;tigkeit zugunsten des Wohlergehens all unserer Mitarbeiter und unserer Anteilseigner.</p>\n\n<h2>12. Dauer, f&uuml;r die die personenbezogenen Daten gespeichert werden</h2>\n\n<p>Das Kriterium f&uuml;r die Dauer der Speicherung von personenbezogenen Daten ist die jeweilige gesetzliche Aufbewahrungsfrist. Nach Ablauf der Frist werden die entsprechenden Daten routinem&auml;&szlig;ig gel&ouml;scht, sofern sie nicht mehr zur Vertragserf&uuml;llung oder Vertragsanbahnung erforderlich sind.</p>\n\n<h2>13. Gesetzliche oder vertragliche Vorschriften zur Bereitstellung der personenbezogenen Daten; Erforderlichkeit f&uuml;r den Vertragsabschluss; Verpflichtung der betroffenen Person, die personenbezogenen Daten bereitzustellen; m&ouml;gliche Folgen der Nichtbereitstellung</h2>\n\n<p>Wir kl&auml;ren Sie dar&uuml;ber auf, dass die Bereitstellung personenbezogener Daten zum Teil gesetzlich vorgeschrieben ist (z.B. Steuervorschriften) oder sich auch aus vertraglichen Regelungen (z.B. Angaben zum Vertragspartner) ergeben kann. Mitunter kann es zu einem Vertragsschluss erforderlich sein, dass eine betroffene Person uns personenbezogene Daten zur Verf&uuml;gung stellt, die in der Folge durch uns verarbeitet werden m&uuml;ssen. Die betroffene Person ist beispielsweise verpflichtet uns personenbezogene Daten bereitzustellen, wenn unser Unternehmen mit ihr einen Vertrag abschlie&szlig;t. Eine Nichtbereitstellung der personenbezogenen Daten h&auml;tte zur Folge, dass der Vertrag mit dem Betroffenen nicht geschlossen werden k&ouml;nnte. Vor einer Bereitstellung personenbezogener Daten durch den Betroffenen muss sich der Betroffene an einen unserer Mitarbeiter wenden. Unser Mitarbeiter kl&auml;rt den Betroffenen einzelfallbezogen dar&uuml;ber auf, ob die Bereitstellung der personenbezogenen Daten gesetzlich oder vertraglich vorgeschrieben oder f&uuml;r den Vertragsabschluss erforderlich ist, ob eine Verpflichtung besteht, die personenbezogenen Daten bereitzustellen, und welche Folgen die Nichtbereitstellung der personenbezogenen Daten h&auml;tte.</p>\n\n<h2>14. Bestehen einer automatisierten Entscheidungsfindung</h2>\n\n<p>Als verantwortungsbewusstes Unternehmen verzichten wir auf eine automatische Entscheidungsfindung oder ein Profiling.</p>\n\n<p>Diese Datenschutzerkl&auml;rung wurde durch den Datenschutzerkl&auml;rungs-Generator der DGD Deutsche Gesellschaft f&uuml;r Datenschutz GmbH, die als&nbsp;<a href="https://dg-datenschutz.de/datenschutz-dienstleistungen/externer-datenschutzbeauftragter/" rel="nofollow">Datenschutzbeauftragter</a>&nbsp;t&auml;tig ist, in Kooperation mit den&nbsp;<a href="https://www.wbs-law.de/it-recht/datenschutzrecht" rel="nofollow">Datenschutz Anw&auml;lten der Kanzlei WILDE BEUGER SOLMECKE | Rechtsanw&auml;lte</a>erstellt.</p>\n'
          }
        },
        firstcategory: {
          'en-US': {
            '1546177486327': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T13:44:46.327Z'
              },
              active: true,
              id: 1546177486327,
              name: 'Schmuk',
              secondCategory: [1546173810837, 1546173822320, 1546173833280]
            },
            '1546177507532': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T13:45:07.532Z'
              },
              active: true,
              id: 1546177507532,
              name: 'Dekoration',
              secondCategory: [1546173843645, 1546173856224, 1546174117923]
            },
            '1546177546300': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T13:45:46.300Z'
              },
              active: true,
              id: 1546177546300,
              name: 'Essen & Trinken',
              secondCategory: [
                1546174141320,
                1546174129882,
                1546174160649,
                1546174181253,
                1546174192860,
                1546174149180
              ]
            },
            '1546177598222': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T13:46:38.222Z'
              },
              active: true,
              id: 1546177598222,
              name: 'Elektrogeräte',
              secondCategory: [
                1546174045067,
                1546174059533,
                1546174088366,
                1546174076211
              ]
            }
          }
        },
        occasion: {
          'en-US': {
            '1527698389950': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-05-30T16:39:49.951Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2018-07-15T09:04:14.366Z'
              },
              activation: true,
              date: '2018-12-24T12:00:00+01:00',
              id: 1527698389950,
              name: 'Weihnachten',
              picture: [1531563247073],
              position: 1
            },
            '1527699643348': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-05-30T17:00:43.348Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2018-07-15T09:04:20.650Z'
              },
              activation: true,
              date: '2018-06-26T19:34:59+02:00',
              id: 1527699643348,
              name: 'Ostern',
              picture: [1531563204262],
              position: 6
            },
            '1530034930355': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-06-26T17:42:10.355Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2018-07-14T10:21:54.746Z'
              },
              activation: true,
              date: '2018-06-26T20:07:22+02:00',
              id: 1530034930355,
              name: 'Beziehung',
              picture: [1531563092357],
              position: 2
            },
            '1530034952544': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-06-26T17:42:32.544Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2018-07-15T09:04:28.170Z'
              },
              activation: true,
              date: '2018-06-26T20:07:35+02:00',
              id: 1530034952544,
              name: 'Für die Frau',
              picture: [1531563101325],
              position: 3
            },
            '1530035000315': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-06-26T17:43:20.315Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2018-07-15T09:04:37.965Z'
              },
              activation: true,
              date: '2018-06-26T19:43:20+02:00',
              id: 1530035000315,
              name: 'Für echte Männer',
              picture: [1531563114467],
              position: 4
            },
            '1530035166137': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-06-26T17:46:06.137Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2018-07-15T09:04:46.393Z'
              },
              activation: true,
              date: '2018-06-26T20:07:55+02:00',
              id: 1530035166137,
              name: 'Geburtstag',
              picture: [1531563126373],
              position: 5
            },
            '1530035198081': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-06-26T17:46:38.081Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2018-07-15T09:05:04.345Z'
              },
              activation: true,
              date: '2018-06-26T20:08:05+02:00',
              id: 1530035198081,
              name: 'Hochzeit',
              picture: [1531563142990],
              position: 7
            },
            '1530035255083': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-06-26T17:47:35.083Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2018-07-15T09:04:54.904Z'
              },
              activation: true,
              date: '2019-05-12T12:00:00+02:00',
              id: 1530035255083,
              name: 'Muttertag',
              picture: [1531563188306],
              position: 8
            },
            '1530035298101': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-06-26T17:48:18.101Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2018-07-15T09:05:15.257Z'
              },
              activation: true,
              date: '2019-05-30T12:00:00+02:00',
              id: 1530035298101,
              name: 'Vatertag',
              picture: [1531563236482],
              position: 9
            },
            '1530035316798': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-06-26T17:48:36.798Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2018-07-15T09:05:24.656Z'
              },
              activation: true,
              date: '2018-06-27T18:08:49+02:00',
              id: 1530035316798,
              name: 'Romatisch',
              picture: [1531563213573],
              position: 10
            },
            '1530035380609': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-06-26T17:49:40.610Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2019-01-15T20:06:09.870Z'
              },
              activation: true,
              date: '2019-02-14T12:00:00+01:00',
              id: 1530035380609,
              name: 'Valentinstag',
              picture: [1531563226779],
              position: 1
            }
          }
        },
        products: {
          'en-US': {
            '1542623529262': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-11-19T10:32:09.262Z',
                lastModifiedBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                lastModifiedDate: '2019-02-22T20:12:16.670Z'
              },
              affiliateLink: 'https://amzn.to/2PAo3rY',
              api: 'amazon',
              apiId: 'B0798M92JC',
              company: '',
              description: '',
              firstCategory: 1546177507532,
              gender: 'unisex',
              group: 'Guild Product',
              id: '1542623529262',
              metaData: {
                lastUpdate: 1548098791501,
                linkVisits: '',
                protokoll:
                  'Update Produkt from Amazon API Date: Mon Jan 21 2019',
                updateError: false,
                visits: 0
              },
              name: 'Lichtschale',
              occasion: [1527698389950],
              offerListingId:
                '8emVxySi0XnrGGtlUof%2FMMmJXR4A333TUnam2gKNNP4q7tMpI6XRvJJczpwTALMrShD2tdbZCceH%2FyCIZLwifyR4HVVo345nLiOHu3%2F0Jz3f5FXAsvBUISOtkdMzg8y1hs4H9nMkcU4m%2F472c9CRgFy4Vm7KpsU7',
              originalLink:
                'https://www.amazon.de/Lichtschale-gold-Geburtstagsgeschenk-Muttertagsgeschenk-Geschenkidee/dp/B0798M92JC?SubscriptionId=AKIAJ6WE2DNROWEZVCYA&tag=dreampresen0c-21&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B0798M92JC',
              originalShop: 'www.amazon.de',
              originalTitle:
                'Lichtschale gold - S (15cm) - Beton schwarz/grau | Unikat handmade | Geburtstagsgeschenk | Gartendeko| Muttertagsgeschenk | Geschenkidee | Geschenk für die Frau',
              pictureLinks: [
                {
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/316GPexV9EL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/316GPexV9EL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/316GPexV9EL._SL75_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91vMxEuNSmL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51fs5PTGHAL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51fs5PTGHAL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51fs5PTGHAL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/713LSKM4H7L.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41Fz9dymyRL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41Fz9dymyRL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41Fz9dymyRL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91f%2Bcs2njpL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51esVNhgIzL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51esVNhgIzL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51esVNhgIzL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/81hU1MT1EUL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41fx3t1gefL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41fx3t1gefL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41fx3t1gefL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71wQER2kdxL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/316GPexV9EL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/316GPexV9EL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/316GPexV9EL._SL110_.jpg'
                }
              ],
              price: '2995',
              secondCategory: 1546174117923
            },
            '1542623747232': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-11-19T10:35:47.232Z',
                lastModifiedBy: 'UNKNOWN',
                lastModifiedDate: '2019-01-21T19:26:31.518Z'
              },
              affiliateLink: 'https://amzn.to/2DKJU9T',
              api: 'amazon',
              apiId: 'B01MXNO79T',
              company: '',
              description: '',
              firstCategory: 1546177507532,
              gender: ['unisex'],
              group: 'Guild Product',
              id: '1542623747232',
              metaData: {
                lastUpdate: 1548098791501,
                linkVisits: '',
                protokoll:
                  'Update Produkt from Amazon API Date: Mon Jan 21 2019',
                updateError: false,
                visits: 0
              },
              name: 'Tischlicht Weihnachten Elch Rot ',
              occasion: [1527698389950],
              offerListingId:
                '8emVxySi0XnXH8u6c6cWdNwXmclGJURe%2BXEwJGFzX6vnhstcZlYqPeo5SAsDcPlQZAMjyzddUqyrjJjO4lGxnNnWkCxOTBWTFmWJ1cieXyphFkFERAix5dU2EOaNG3hzF%2F%2BsU%2FcdGTKcnYDcLh5ojIhTC3ZvTJ0%2F',
              originalLink:
                'https://www.amazon.de/Lichth%C3%BClle-Tischlicht-Weihnachten-Weihnachtsdeko-handmade/dp/B01MXNO79T?SubscriptionId=AKIAJ6WE2DNROWEZVCYA&tag=dreampresen0c-21&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B01MXNO79T',
              originalShop: 'www.amazon.de',
              originalTitle:
                'Set 6 x Lichthülle für Tischlicht Weihnachten Elch Rot Weihnachtsdeko Advent handmade',
              pictureLinks: [
                {
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41l8HraFuZL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41l8HraFuZL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41l8HraFuZL._SL75_.jpg'
                },
                {
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41i3kj3OcJL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41i3kj3OcJL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41i3kj3OcJL._SL110_.jpg'
                },
                {
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41lgoJ-H-eL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41lgoJ-H-eL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41lgoJ-H-eL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/81AgBm-aC1L.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51Fnmc53j0L.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51Fnmc53j0L._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51Fnmc53j0L._SL110_.jpg'
                },
                {
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41l8HraFuZL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41l8HraFuZL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41l8HraFuZL._SL110_.jpg'
                }
              ],
              price: '790',
              secondCategory: 1546173856224
            },
            '1542723028898': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-11-20T14:10:28.898Z',
                lastModifiedBy: 'UNKNOWN',
                lastModifiedDate: '2019-01-21T19:26:31.525Z'
              },
              affiliateLink: 'https://amzn.to/2PDrxtG',
              api: 'amazon',
              apiId: 'B07BVNLXDW',
              company: '',
              description:
                'Tauchen Sie in die Brillanz von 4K HDR ein: Unglaubliche Kontraste, lebensrechte Farben und außerordentliches Detail in 4K.<br>4K X-Reality PRO - Jedes Detail neu durchdacht: Dank einer Bilddatenbank die Kontraste, Farben und Details überprüft, wird  jede Szene analysiert und verbessert.<br>Mit unserer Funktion zur Sprachsteuerung drücken Sie einfach nur den Mikrofon-Button und sagen Android was Sie sehen möchten.<br>Das schlanke Gehäuse, die Einfassung mit abgerundeten Ecken und der elegant gewinkelte Standfuß in warmem Silber bilden einen idealen Platz für eine Soundbar.<br>Motionflow XR - für ebenmäßige Action: Genießen Sie glatte und scharfe Details selbst in schnellen Actionszenen dank Motionflow XR Technologie.',
              firstCategory: 1539623280907,
              gender: 'unisex',
              group: 'Home Theater',
              id: '1542723028898',
              metaData: {
                lastUpdate: 1548098791501,
                linkVisits: 0,
                protokoll:
                  'Update Produkt from Amazon API Date: Mon Jan 21 2019',
                updateError: false,
                visits: 0
              },
              name: 'Samsung 55" Smart TV',
              occasion: [1527698389950, 1530035166137, 1530035000315],
              offerListingId:
                '8emVxySi0XnrGGtlUof%2FMGAlcRKLhIugWuQhKs4fmwE6W1gwZrDR%2BmMU0tbUjVW5xx%2Bi62gdkaIk01xHWs%2B4kFXR%2F60vlt6RZ4V%2BCw%2Fvefw%3D',
              originalLink:
                'https://www.amazon.de/Sony-KD-55XF7596-Fernseher-Android-Schwarz/dp/B07BVNLXDW?psc=1&SubscriptionId=AKIAJ6WE2DNROWEZVCYA&tag=dreampresen0c-21&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B07BVNLXDW',
              originalShop: 'www.amzon.de',
              originalTitle:
                'Sony KD-55XF7596 Bravia 139,7 cm (55 Zoll) Fernseher (Ultra HD, 4K HDR, Android Smart TV) Schwarz',
              pictureLinks: [
                {
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51R2ZL3GFwL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51R2ZL3GFwL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51R2ZL3GFwL._SL75_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71PB449HgrL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51Kz%2BgiOWmL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51Kz%2BgiOWmL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51Kz%2BgiOWmL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91bxMNaJGYL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51-50VbUp4L.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51-50VbUp4L._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51-50VbUp4L._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91u%2BtLSKnFL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/513OwWC-rML.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/513OwWC-rML._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/513OwWC-rML._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91lyOqUFehL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51rQLzBTw9L.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51rQLzBTw9L._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51rQLzBTw9L._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91V5VzwXU0L.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51MeO2d6p2L.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51MeO2d6p2L._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51MeO2d6p2L._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91UtzfLJjHL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/512XIH0ObiL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/512XIH0ObiL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/512XIH0ObiL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71NFwzJUOcL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/31J%2Bz7qlMaL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/31J%2Bz7qlMaL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/31J%2Bz7qlMaL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91cfxKqHERL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51R2ZL3GFwL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51R2ZL3GFwL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51R2ZL3GFwL._SL110_.jpg'
                }
              ],
              price: '63496',
              secondCategory: 1539623290413
            },
            '1542736913606': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-11-20T18:01:53.606Z',
                lastModifiedBy: 'UNKNOWN',
                lastModifiedDate: '2019-01-21T19:26:31.532Z'
              },
              affiliateLink: 'https://amzn.to/2BmhjW8',
              api: 'amazon',
              apiId: 'B07CM6X8HW',
              company: '',
              description:
                '<h2 style="text-align:center"><span style="font-size:24px"><span style="font-family:Georgia,serif"><u>Das ist ein Test &uuml;berschrift</u></span></span></h2>\n\n<p style="text-align:center"><span style="font-size:48px"><span style="font-family:Georgia,serif"><u>Hier sollte eine &Uuml;berschrift stehen</u></span></span></p>\n\n<ul>\n\t<li><strong>Prozessor</strong>: Intel Core i7-8550U (1,80 GHz bis zu 4,00 GHz Burst-Frequenz)</li>\n\t<li><strong>Besonderheiten</strong>: Geb&uuml;ndelte Power mit Intel Core i7 CPU, rasanter SSD und bis zu 10h Akkulaufzeit. Genie&szlig;en Sie gestochen scharfe Bilder auf dem matten 15 Zoll Full-HD Display mit IPS Technologie</li>\n\t<li><strong>Design:</strong> Genie&szlig;en Sie das ultraschlanke- und leichte Vollaluminium-Design. Die extra schmalen Displayr&auml;nder lassen Das Ultrabook noch edler aussehen. Mit der QWERTZ-Tastatur mit <strong>Hintergrundbeleuchtung</strong> k&ouml;nnen Sie auch ganz komfortabel im Dunkeln arbeiten.</li>\n\t<li><strong>Vielf&auml;ltige</strong> Anschl&uuml;sse und Schnittstellen: Bluetooth 4.0, HD Webcam, AC-WLAN, 1x HDMI, 1x USB 3.1, 2x USB 3.0, 1x USB 2.0, SD Kartenleser, 1x Audio In/Out</li>\n\t<li><strong>Herstellergarantie</strong>: 2 Jahre Garantie (Einsende-/ R&uuml;cksendeservice) inkl. 1 Jahr International Travelers Warranty, Lieferumfang: 1x Acer Swift 3, 65W AC-Netzteil</li>\n</ul>\n',
              firstCategory: 1546177598222,
              gender: 'unisex',
              group: 'Computer & Zubehör',
              id: '1542736913606',
              metaData: {
                lastUpdate: 1548098791501,
                linkVisits: 0,
                protokoll:
                  'Update Produkt from Amazon API Date: Mon Jan 21 2019',
                updateError: false,
                visits: 0
              },
              name: 'Acer Swift 3 ',
              occasion: [1527698389950],
              offerListingId:
                '8emVxySi0XnrGGtlUof%2FMJ4lSHRf75Xg19PbPe%2BInpm8ZgtXpfkLBq8HV7nPqLdU9rullJbfHq2J9u7IFVSnRt49scbOoE9iwoXVqux0trY%3D',
              originalLink:
                'https://www.amazon.de/Acer-SF315-52G-84BN-Full-HD-Ultrabook-i7-8550U/dp/B07CM6X8HW?SubscriptionId=AKIAJ6WE2DNROWEZVCYA&tag=dreampresen0c-21&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B07CM6X8HW',
              originalShop: 'www.amazon.de',
              originalTitle:
                'Acer Swift 3 SF315-52G-84BN 39,6 cm (15,6 Full-HD IPS matt) Ultrabook (Intel Core i7-8550U, 8GB RAM, 256GB SSD, NVIDIA GeForce MX150 (2GB VRAM), Win 10) silber',
              pictureLinks: [
                {
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/415uWgkgESL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/415uWgkgESL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/415uWgkgESL._SL75_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71cvmMJ04QL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/31D20JZj-sL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/31D20JZj-sL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/31D20JZj-sL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91ufDeI2B7L.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41Jhak8NeyL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41Jhak8NeyL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41Jhak8NeyL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/816wqwupEcL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/31W8GXxgVML.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/31W8GXxgVML._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/31W8GXxgVML._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71yobUS-p6L.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/31vKUPBzmYL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/31vKUPBzmYL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/31vKUPBzmYL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71NVmG6t8NL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/31v6a6Vyn3L.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/31v6a6Vyn3L._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/31v6a6Vyn3L._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/81X6eVPLhmL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41GIfaLwOwL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41GIfaLwOwL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41GIfaLwOwL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/81EwXzCph5L.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41GUBMn6ZdL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41GUBMn6ZdL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41GUBMn6ZdL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91pcOQfY4sL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/414P0DMD%2BwL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/414P0DMD%2BwL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/414P0DMD%2BwL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91L77%2BGk3NL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/510HwZW6X3L.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/510HwZW6X3L._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/510HwZW6X3L._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/81-w36Pm%2BmL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/413anYtO3JL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/413anYtO3JL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/413anYtO3JL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91%2BmeCx9DVL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51EI-4rq2KL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51EI-4rq2KL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51EI-4rq2KL._SL110_.jpg'
                },
                {
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51TOMZ-fzlL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51TOMZ-fzlL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51TOMZ-fzlL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/81numg1pypL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/415uWgkgESL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/415uWgkgESL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/415uWgkgESL._SL110_.jpg'
                }
              ],
              price: '99900',
              secondCategory: 1546174045067
            },
            '1548268136055': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2019-01-23T18:28:56.055Z',
                lastModifiedBy: 'UNKNOWN',
                lastModifiedDate: '2019-01-23T19:24:37.351Z'
              },
              affiliateLink: 'https://amzn.to/2TbGjWy',
              api: 'amazon',
              apiId: 'B071CFBXXZ',
              company: '',
              description:
                'PERFEKTES LICHT: Gibt die richtige Menge Licht ab, um Sie durch die Dunkelheit zu führen.<br>AUTOMATISCHE BELEUCHTUNG: Wenn Lichtsensoren Dunkelheit messen, schalten sich die Bewegungssensoren ein, um im richtigen Moment Licht zu spenden. Es werden Bewegungen im 120°-Winkel auf bis zu drei Metern Entfernung erkannt.<br>ENERGIEEFFIZIENT: Drei AAA-Batterien (nicht mitgeliefert) spenden etwa ein Jahr lang angenehmes Licht.<br>NACHTLICHT: Verhindert, dass Sie nachts das Licht einschalten müssen.<br>WAS SIE BEKOMMEN: Drei Lumi Nachtlichter zum Aufkleben, 6 Schrauben, 6 Dübel, eine Bedienungsanleitung, eine Happy Card und 18 Monate Garantie.',
              firstCategory: 1546177598222,
              gender: 'unisex',
              group: 'Beleuchtung',
              id: '1548268136055',
              metaData: {
                create: '2019-01-23T19:25',
                lastUpdate: 1548271477345,
                linkVisits: 0,
                protokoll:
                  'Update Produkt from Amazon API Date: Wed Jan 23 2019',
                updateError: false,
                visits: 0
              },
              name: 'LED Nachtlicht mit Bewegungssensor',
              occasion: [1530034952544, 1527698389950, 1530035255083],
              offerListingId:
                'uspt6pELry5EENJhBijfh9SD556j0H3gG9rUiJOUYnXbiQyU2%2BOqdXLMUfUjZzmwGLiqPqCmw%2FKrhKef9lmoSwSNG%2BdW7bGSaxPQeoO0L8X%2FnoY%2BQZDhk%2FF0x4WnEsaD6Hav%2BAreag1catC3Q86Olw%3D%3D',
              originalLink:
                'https://www.amazon.de/Bewegungssensor-Schrankbeleuchtung-Kinderzimmer-Orientierungslicht-Energieeffizient/dp/B071CFBXXZ?SubscriptionId=AKIAJ6WE2DNROWEZVCYA&tag=dreampresen0c-21&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B071CFBXXZ',
              originalShop: 'www.amazon.de',
              originalTitle:
                'Eufy Lumi 3 Pack LED Nachtlicht mit Bewegungssensor,Warmes weißes LED Lichter,Auto ON/OFF, Schrankbeleuchtung mit Haftend für Kinderzimmer, Schlafzimmer, Orientierungslicht, Energieeffizient (3 Pack)',
              pictureLinks: [
                {
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/315gmTFsZ7L.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/315gmTFsZ7L._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/315gmTFsZ7L._SL75_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71jJhfwsskL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41eSUGa%2Bk4L.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41eSUGa%2Bk4L._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41eSUGa%2Bk4L._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71mDpDB4LGL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51k-30jSXqL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51k-30jSXqL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51k-30jSXqL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/61318Xl5v1L.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/411FJzw1SIL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/411FJzw1SIL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/411FJzw1SIL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71V%2BV2LLq%2BL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41iAc1ULsWL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41iAc1ULsWL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41iAc1ULsWL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71lCMaG9GZL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51gSu2CXg-L.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51gSu2CXg-L._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51gSu2CXg-L._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/61pnEYXZKJL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41xtbvzJsvL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41xtbvzJsvL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41xtbvzJsvL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/51KsanE%2BGhL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/315gmTFsZ7L.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/315gmTFsZ7L._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/315gmTFsZ7L._SL110_.jpg'
                }
              ],
              price: '1499',
              secondCategory: 1546174117923
            },
            '1548269859478': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2019-01-23T18:57:39.478Z',
                lastModifiedBy: 'UNKNOWN',
                lastModifiedDate: '2019-01-23T19:24:37.373Z'
              },
              affiliateLink: 'https://amzn.to/2U63HEK',
              api: 'amazon',
              apiId: 'B07J5YD6FS',
              company: 'Innovative Technology',
              description:
                'Umfangreiche Funktionen - Plattenspieler mit drei Geschwindigkeiten, CD-Player, FM-Radio, Bluetooth und 3,5-mm-Aux-Eingang<br>Beeindruckendes 50er-Jahre-Mahagoni-Styling<br>Wunderschöner Drehknopf für das Analogradio<br>Eingebaute Stereolautsprecher',
              firstCategory: 1546177598222,
              gender: 'unisex',
              group: 'Musical Instruments',
              id: '1548269859478',
              metaData: {
                create: '2019-01-23T19:25',
                lastUpdate: 1548271477345,
                linkVisits: 0,
                protokoll:
                  'Update Produkt from Amazon API Date: Wed Jan 23 2019',
                updateError: false,
                visits: 0
              },
              name: 'Bluethooth Record Player Music Centre mit Plattenspieler',
              occasion: [1530035000315],
              offerListingId:
                'uspt6pELry5EENJhBijfh6iVhKR0trgvdDCWPIfRRa5eQPI5U%2BeCLT360wH%2FhS1dC2KMdMaSl4A54raHFIIHLpcGy%2BpX5Mew9PVTtNyRbus%3D',
              originalLink:
                'https://www.amazon.de/Victrola-Avenue-Bluetooth-Record-Player/dp/B07J5YD6FS?SubscriptionId=AKIAJ6WE2DNROWEZVCYA&tag=dreampresen0c-21&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B07J5YD6FS',
              originalShop: 'www.amazon.de',
              originalTitle:
                'Victrola Park Avenue 5-1 Bluetooth Record Player Music Centre - Expresso',
              pictureLinks: [
                {
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41NBBThozfL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41NBBThozfL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41NBBThozfL._SL75_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/81YRu7LKxYL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51PrTEJ-waL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51PrTEJ-waL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51PrTEJ-waL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/81zROX1I89L.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41bjrLmTWwL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41bjrLmTWwL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41bjrLmTWwL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71rIIV%2B7KUL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51JXu7ezrQL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51JXu7ezrQL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51JXu7ezrQL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71Oxz6hOYvL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41mkwgAJ-oL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41mkwgAJ-oL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41mkwgAJ-oL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71cDVdmXKWL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41NBBThozfL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41NBBThozfL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41NBBThozfL._SL110_.jpg'
                }
              ],
              price: '16811'
            }
          }
        },
        secondcategory: {
          'en-US': {
            '1539623290413': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-10-15T17:08:10.413Z'
              },
              id: 1539623290413,
              name: 'Test'
            },
            '1546173810837': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:43:30.837Z'
              },
              id: 1546173810837,
              name: 'Armband'
            },
            '1546173822320': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:43:42.320Z'
              },
              id: 1546173822320,
              name: 'Halskette'
            },
            '1546173833280': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:43:53.280Z'
              },
              id: 1546173833280,
              name: 'Ohringe'
            },
            '1546173843645': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:44:03.645Z'
              },
              id: 1546173843645,
              name: 'Tischdeko'
            },
            '1546173856224': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:44:16.224Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2018-12-30T12:45:43.674Z'
              },
              id: 1546173856224,
              name: 'Kerzen'
            },
            '1546174045067': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:47:25.067Z'
              },
              id: 1546174045067,
              name: 'Notebooks & Pc`s'
            },
            '1546174059533': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:47:39.533Z'
              },
              id: 1546174059533,
              name: 'Fehrnseher'
            },
            '1546174076211': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:47:56.211Z'
              },
              id: 1546174076211,
              name: 'Smartphones'
            },
            '1546174088366': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:48:08.366Z'
              },
              id: 1546174088366,
              name: 'Tablets'
            },
            '1546174117923': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:48:37.923Z'
              },
              id: 1546174117923,
              name: 'Lampen'
            },
            '1546174129882': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:48:49.882Z'
              },
              id: 1546174129882,
              name: 'Fleisch'
            },
            '1546174141320': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:49:01.320Z'
              },
              id: 1546174141320,
              name: 'Spirituosen'
            },
            '1546174149180': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:49:09.180Z'
              },
              id: 1546174149180,
              name: 'Bier'
            },
            '1546174160649': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:49:20.649Z'
              },
              id: 1546174160649,
              name: 'Wein'
            },
            '1546174181253': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:49:41.254Z'
              },
              id: 1546174181253,
              name: 'Alkoholfreie Getränke'
            },
            '1546174192860': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:49:52.860Z'
              },
              id: 1546174192860,
              name: 'Süßigkeiten'
            }
          }
        },
        startsite: {
          'en-US': {
            __meta__: {
              createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
              createdDate: '2018-05-30T17:13:15.197Z',
              lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
              lastModifiedDate: '2018-07-14T10:19:43.455Z'
            },
            bigStartImage: [1531563333298],
            id: 'startsite',
            mediumStartImage: [1531563333298],
            smalStartImage: [1527700339772],
            smallStartImage: [1531563333298],
            text:
              'Das perfekte Geschenk zu jedem deiner Anlässe! Mimi ich liebe dich!'
          }
        }
      },
      navigation: {
        mainNav: {
          'en-US': {
            __meta__: {
              createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
              createdDate: '2019-02-21T08:24:22.671Z'
            },
            id: 'mainNav',
            items: [
              {
                attachment: 0,
                component: '',
                cssClass: 'home',
                id: 1550737379833,
                newWindow: false,
                order: 0,
                parentIndex: 0,
                title: 'Home',
                url: '/',
                uuid: 1550737379833
              },
              {
                attachment: 0,
                component: '',
                cssClass: 'about',
                id: 1550737393540,
                newWindow: false,
                order: 1,
                parentIndex: 0,
                title: 'About',
                url: '/about',
                uuid: 1550737393540
              },
              {
                attachment: 0,
                component: '',
                cssClass: 'about',
                id: 1550737414320,
                newWindow: false,
                order: 2,
                parentIndex: 1550737393540,
                title: 'Team',
                url: '/about/team',
                uuid: 1550737414320
              },
              {
                attachment: 0,
                component: '',
                cssClass: 'about',
                id: 1550737442171,
                newWindow: false,
                order: 3,
                parentIndex: 1550737393540,
                title: 'Careers',
                url: '/about/careers',
                uuid: 1550737442171
              }
            ],
            title: 'Main Nav'
          }
        }
      },
      schemas: {
        dataProtection: {
          __meta__: {
            createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            createdDate: '2018-06-09T16:33:02.387Z',
            lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            lastModifiedDate: '2018-06-19T18:33:32.400Z'
          },
          description: 'Datenschutzerklärung',
          enabled: true,
          fields: [
            {
              defaultValue: '',
              description: 'Text der Datenschutzerklärung',
              gridColumns: {
                lg: 12,
                md: 12,
                sm: 12,
                xs: 12
              },
              id: 1529433075571,
              key: 'text',
              show: false,
              title: 'text',
              type: 'wysiwyg-cke'
            }
          ],
          group: 'Law',
          icon: '',
          id: 'dataProtection',
          sortable: true,
          title: 'DataProtection',
          type: 'single'
        },
        firstcategory: {
          __meta__: {
            createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            createdDate: '2018-05-27T11:05:32.201Z',
            lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            lastModifiedDate: '2018-12-30T13:44:25.428Z'
          },
          description: 'Übergeordnete Kategorie',
          enabled: true,
          fields: [
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: false,
                    message: '^Field is required'
                  },
                  uniqueKey: 'ByQgWGu17'
                }
              ],
              defaultValue: '',
              description: 'Name der Übergeordneten Kategorie',
              gridColumns: {
                lg: 6,
                md: 12,
                sm: 12,
                xs: 12
              },
              id: 1527419077505,
              key: 'name',
              show: true,
              title: 'Name',
              type: 'text'
            },
            {
              description: 'Zugehörige unterkategorien',
              fieldSeparator: ' - ',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              hidden: false,
              id: 1546173353552,
              key: 'secondCategory',
              multiple: true,
              relation: 'secondcategory',
              relationalFieldsToShow: ['name'],
              show: true,
              title: 'Second Category',
              type: 'select-relational'
            },
            {
              defaultValue: true,
              description: 'Zustand der Kategorie',
              gridColumns: {
                lg: 3,
                md: 3,
                sm: 12,
                xs: 12
              },
              hidden: false,
              id: 1546174218797,
              key: 'active',
              show: true,
              title: 'active',
              type: 'switch'
            }
          ],
          group: 'firstcategory',
          icon: '',
          id: 'firstcategory',
          sortable: true,
          title: 'firstcategory',
          type: 'collection'
        },
        footer: {
          __meta__: {
            createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            createdDate: '2018-06-09T16:17:35.713Z',
            lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            lastModifiedDate: '2018-06-09T16:34:45.183Z'
          },
          description: 'Fußbereich der Webseite',
          enabled: true,
          fields: [
            {
              description: 'Logo der Webseite',
              gridColumns: {
                lg: 3,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1528560407364,
              key: 'logo',
              limit: 1,
              mediaTypes: ['images'],
              show: false,
              title: 'logo',
              type: 'media'
            },
            {
              defaultValue: '',
              description: 'Kurzer Text über uns',
              gridColumns: {
                lg: 12,
                md: 12,
                sm: 12,
                xs: 12
              },
              id: 1528562019240,
              key: 'aboutUs',
              show: false,
              title: 'About Us',
              type: 'text'
            }
          ],
          group: 'Group Name',
          icon: '',
          id: 'footer',
          sortable: true,
          title: 'footer',
          type: 'collection'
        },
        occasion: {
          __meta__: {
            createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            createdDate: '2018-05-27T11:02:33.742Z',
            lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            lastModifiedDate: '2018-05-30T16:38:20.053Z'
          },
          description: 'Anlässe',
          enabled: true,
          fields: [
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: false,
                    message: '^Field is required'
                  },
                  uniqueKey: 'HJTZrG_1Q'
                }
              ],
              defaultValue: '',
              description: 'Name des Anlass',
              gridColumns: {
                lg: 6,
                md: 12,
                sm: 12,
                xs: 12
              },
              id: 1527418929985,
              key: 'name',
              show: true,
              title: 'Name',
              type: 'text'
            },
            {
              defaultValue: true,
              description: 'Anzeige des Anlasses ein und auschalten',
              gridColumns: {
                lg: 3,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1527419553330,
              key: 'activation',
              show: true,
              title: 'Activation',
              type: 'switch'
            },
            {
              defaultValue: 0,
              description: 'Position der Anzeige auf der Startseite',
              gridColumns: {
                lg: 3,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1527419754349,
              key: 'position',
              show: true,
              title: 'Position',
              type: 'number'
            },
            {
              defaultValue: '',
              description: 'Datum des Anlass',
              gridColumns: {
                lg: 3,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1527420044884,
              key: 'date',
              show: false,
              title: 'Date',
              type: 'date'
            },
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: false,
                    message: '^Field is required'
                  },
                  uniqueKey: 'BkdYHfukX'
                }
              ],
              description:
                'Bild welches auf der Startseite als Anlass angezeigt wird',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1527420221128,
              key: 'picture',
              limit: 1,
              mediaTypes: ['images'],
              show: true,
              title: 'Picture',
              type: 'media'
            }
          ],
          group: 'Group Name',
          icon: '',
          id: 'occasion',
          sortable: true,
          title: 'occasion',
          type: 'collection'
        },
        products: {
          __meta__: {
            createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            createdDate: '2018-05-27T11:11:04.813Z',
            lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            lastModifiedDate: '2019-01-23T18:26:40.923Z'
          },
          description: 'Produkte',
          enabled: true,
          fields: [
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: false,
                    message: 'Bitte geben sie einen Namen für das Produkt ein'
                  },
                  uniqueKey: 'H1_HfGu1m'
                }
              ],
              defaultValue: '',
              description: 'Name des Produktes',
              gridColumns: {
                lg: 6,
                md: 12,
                sm: 12,
                xs: 12
              },
              id: 1527419441379,
              key: 'name',
              show: true,
              title: 'Name',
              type: 'text'
            },
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: false,
                    message:
                      'Wählen sie ein geeignetes Geschlecht für das Produkt'
                  },
                  uniqueKey: 'mfJWb5PAx'
                }
              ],
              description: '',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1541691706670,
              key: 'gender',
              multiple: false,
              options: [
                {
                  label: 'Mänlich',
                  uniqueKey: 'zpsPjVLxiJ',
                  value: 'male'
                },
                {
                  label: 'Weiblich',
                  uniqueKey: 'wA-U0GQX8',
                  value: 'female'
                },
                {
                  label: 'Egal',
                  uniqueKey: 'fwaJOkFPs',
                  value: 'unisex'
                }
              ],
              show: false,
              title: 'Gender',
              type: 'select'
            },
            {
              defaultValue: '',
              description: 'Original Link zum Produkt',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1527421413729,
              key: 'originalLink',
              show: false,
              title: 'Original Link',
              type: 'text'
            },
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: false,
                    message: 'Bitte geben sie die URL des Orginalshops ein'
                  },
                  uniqueKey: 'V7D-igk-R'
                }
              ],
              defaultValue: '',
              description: 'Link zum Original Shop',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1527422011640,
              key: 'originalShop',
              show: false,
              title: 'Original Shop',
              type: 'text'
            },
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: false,
                    message:
                      'Bitte geben sie einen Generierten AffiliateLink ein, fals sie keinen besitzten geben sie die URL zu dem Produkt an.'
                  },
                  uniqueKey: 'i67yz236s'
                }
              ],
              defaultValue: '',
              description: '',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1531045180126,
              key: 'affiliateLink',
              show: false,
              title: 'AffiliateLink',
              type: 'text'
            },
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: true,
                    message: 'Bitte wählen sie ihre API aus.'
                  },
                  uniqueKey: 'r1tLNwJX7'
                }
              ],
              description: 'Service des Produktes (API)',
              gridColumns: {
                lg: 3,
                md: 3,
                sm: 12,
                xs: 12
              },
              id: 1531044854516,
              key: 'api',
              multiple: false,
              options: [
                {
                  label: 'Amazon',
                  uniqueKey: 'Hym4EDyQQ',
                  value: 'amazon'
                },
                {
                  label: 'Keine API',
                  uniqueKey: 'BJWSEwkXm',
                  value: 'no'
                }
              ],
              show: true,
              title: 'api',
              type: 'select'
            },
            {
              defaultValue: '',
              description: 'NoAPI => Keine | Amazon => ASIN',
              gridColumns: {
                lg: 3,
                md: 3,
                sm: 12,
                xs: 12
              },
              id: 1542622207244,
              key: 'apiId',
              show: false,
              title: 'ApiId',
              type: 'text'
            },
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: false,
                    message:
                      'Wählen sie ein oder mehrere Anlässe für dieses Produkt.'
                  },
                  uniqueKey: 'SJChLf_kQ'
                }
              ],
              description: 'Anlass zum verschenken dieses Produktes',
              fieldSeparator: '-',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1527420541340,
              key: 'occasion',
              multiple: true,
              relation: 'occasion',
              relationalFieldsToShow: ['name'],
              show: true,
              title: 'Occasion',
              type: 'select-relational'
            },
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: false,
                    message:
                      'Bitte wählen sie eine passende über Kategorie aus.'
                  },
                  uniqueKey: 'B1n0WIOyQ'
                }
              ],
              description: 'Auswahl der Übergeordneten Kategorie',
              fieldSeparator: '-',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              hidden: false,
              id: 1527435664316,
              key: 'firstCategory',
              multiple: false,
              relation: 'firstcategory',
              relationalFieldsToShow: ['name'],
              show: true,
              title: 'First Category',
              type: 'select-relational'
            },
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: false,
                    message: '^Field is required'
                  },
                  uniqueKey: 'lAEKvfzVr'
                }
              ],
              description: 'Auswahl der Untergeordneten Kategorie',
              fieldSeparator: ' - ',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              hidden: false,
              id: 1527435759772,
              key: 'secondCategory',
              multiple: false,
              relation: 'secondcategory',
              relationalFieldsToShow: ['name'],
              show: true,
              title: 'Second Category',
              type: 'select-relational'
            },
            {
              description: 'Bilder welche Lokal vorhanden sind',
              gridColumns: {
                lg: 3,
                md: 3,
                sm: 12,
                xs: 12
              },
              id: 1542622420490,
              key: 'ppictures',
              limit: 10,
              mediaTypes: ['images'],
              show: false,
              title: 'Ppictures',
              type: 'media'
            },
            {
              defaultValue: '',
              description: 'Beschreibung des Produktes',
              gridColumns: {
                lg: 12,
                md: 12,
                sm: 12,
                xs: 12
              },
              hidden: false,
              id: 1542622300649,
              key: 'description',
              show: false,
              title: 'Description',
              type: 'wysiwyg-cke'
            },
            {
              description:
                'Link zu einem Bild (Bitte nur verwenden wenn keine Api verwendet wird! Bilder werden nur geladen sobald der Bereich NoAPI Aktive ist!!!)',
              gridColumns: {
                xs: 12
              },
              hidden: false,
              id: 1530351876391,
              key: 'pictureLinks',
              layout: 'table',
              options: [
                {
                  defaultValue: '',
                  description:
                    'Link zu einem Bild mit ganz schwacher auflösung',
                  gridColumns: {
                    lg: 12,
                    md: 12,
                    sm: 12,
                    xs: 12
                  },
                  id: 1530352082561,
                  key: 'tiny',
                  show: false,
                  title: 'tiny',
                  type: 'text'
                },
                {
                  defaultValue: '',
                  description: '',
                  gridColumns: {
                    lg: 12,
                    md: 12,
                    sm: 12,
                    xs: 12
                  },
                  id: 1542369162729,
                  key: 'medium',
                  show: false,
                  title: 'medium',
                  type: 'text'
                },
                {
                  defaultValue: '',
                  description: '',
                  gridColumns: {
                    lg: 12,
                    md: 12,
                    sm: 12,
                    xs: 12
                  },
                  id: 1542369164031,
                  key: 'large',
                  show: false,
                  title: 'large',
                  type: 'text'
                },
                {
                  defaultValue: '',
                  description: '',
                  gridColumns: {
                    lg: 12,
                    md: 12,
                    sm: 12,
                    xs: 12
                  },
                  id: 1542369165899,
                  key: 'hiRes',
                  show: false,
                  title: 'hiRes',
                  type: 'text'
                },
                {
                  defaultValue: '',
                  description: '',
                  gridColumns: {
                    lg: 12,
                    md: 12,
                    sm: 12,
                    xs: 12
                  },
                  id: 1542369167432,
                  key: 'other',
                  show: false,
                  title: 'other',
                  type: 'text'
                }
              ],
              show: false,
              title: 'Picture Links',
              type: 'repeater'
            },
            {
              defaultValue: '',
              description: '',
              gridColumns: {
                lg: 3,
                md: 3,
                sm: 3,
                xs: 9
              },
              id: 1541691889255,
              key: 'price',
              show: false,
              title: 'Price',
              type: 'number'
            },
            {
              defaultValue: '',
              description: 'Produktkategorie im Originalshop',
              gridColumns: {
                lg: 3,
                md: 3,
                sm: 12,
                xs: 12
              },
              id: 1542618705124,
              key: 'group',
              show: false,
              title: 'ProductGroup',
              type: 'text'
            },
            {
              defaultValue: '',
              description: 'Original Titel im Online Shop',
              gridColumns: {
                lg: 3,
                md: 3,
                sm: 12,
                xs: 12
              },
              id: 1542618538753,
              key: 'originalTitle',
              show: false,
              title: 'OriginalTitle',
              type: 'text'
            },
            {
              defaultValue: '',
              description: 'Hersteller des Produktes',
              gridColumns: {
                lg: 3,
                md: 3,
                sm: 12,
                xs: 12
              },
              id: 1542618585935,
              key: 'company',
              show: false,
              title: 'Company',
              type: 'text'
            },
            {
              description: 'Daten welche vom Computer generiert werden',
              gridColumns: {
                lg: 12,
                md: 12,
                sm: 12,
                xs: 12
              },
              hidden: false,
              id: 1542368528883,
              key: 'metaData',
              options: [
                {
                  defaultValue: '',
                  description: '',
                  gridColumns: {
                    lg: 12,
                    md: 12,
                    sm: 12,
                    xs: 12
                  },
                  id: 1542368600982,
                  key: 'protokoll',
                  show: false,
                  title: 'Protokoll',
                  type: 'textarea'
                },
                {
                  defaultValue: 0,
                  description: 'Anzahl der Besucher auf der Produktseite',
                  gridColumns: {
                    lg: 3,
                    md: 3,
                    sm: 12,
                    xs: 12
                  },
                  id: 1542368613874,
                  key: 'visits',
                  show: false,
                  step: '1',
                  title: 'Visits',
                  type: 'number'
                },
                {
                  defaultValue: 0,
                  description: 'Datum und Zeitpunkt des letzten Updates',
                  gridColumns: {
                    lg: 3,
                    md: 3,
                    sm: 12,
                    xs: 12
                  },
                  id: 1542368667304,
                  key: 'lastUpdate',
                  show: false,
                  step: '1',
                  title: 'LastUpdate',
                  type: 'number'
                },
                {
                  defaultValue: 0,
                  description:
                    'Besucher welche den Affillate Link ausgewählt haben',
                  gridColumns: {
                    lg: 3,
                    md: 3,
                    sm: 12,
                    xs: 12
                  },
                  id: 1542368736979,
                  key: 'linkVisits',
                  show: false,
                  step: '1',
                  title: 'LinkVisits',
                  type: 'number'
                },
                {
                  defaultValue: false,
                  description:
                    'Aktiviert wenn ein Fehler beim Updaten über eine API enstanden ist',
                  gridColumns: {
                    lg: 3,
                    md: 3,
                    sm: 3,
                    xs: 3
                  },
                  id: 1542724453717,
                  key: 'updateError',
                  show: false,
                  title: 'UpdateError',
                  type: 'boolean'
                },
                {
                  defaultValue: '2019-01-23T19:25',
                  description: '',
                  displayFormat: 'DD/MM/YYYY hh:mm',
                  gridColumns: {
                    lg: 3,
                    md: 3,
                    sm: 12,
                    xs: 12
                  },
                  hidden: false,
                  id: 1548267935498,
                  key: 'create',
                  show: false,
                  title: 'create',
                  type: 'datetime-local'
                }
              ],
              overviewFields: ['updateError', 'visits'],
              show: true,
              title: 'MetaData',
              type: 'fieldset'
            },
            {
              defaultValue: '',
              description: 'Amazon Id, muss nicht selbst gefüllt werden',
              gridColumns: {
                lg: 3,
                md: 3,
                sm: 3,
                xs: 3
              },
              hidden: true,
              id: 1548091693072,
              key: 'offerListingId',
              show: false,
              title: 'offerListingId',
              type: 'text'
            }
          ],
          group: 'Group Name',
          icon: '',
          id: 'products',
          sortable: true,
          title: 'products',
          type: 'collection'
        },
        secondcategory: {
          __meta__: {
            createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            createdDate: '2018-05-27T11:10:08.894Z',
            lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            lastModifiedDate: '2018-12-30T13:28:21.645Z'
          },
          description: 'Untergeordnete Kategorie',
          enabled: true,
          fields: [
            {
              defaultValue: '',
              description: 'Untergeordnete Kategorie Name',
              gridColumns: {
                lg: 6,
                md: 12,
                sm: 12,
                xs: 12
              },
              id: 1527419392376,
              key: 'name',
              show: false,
              title: 'Name',
              type: 'text'
            }
          ],
          group: 'secondcategory',
          icon: '',
          id: 'secondcategory',
          sortable: true,
          title: 'secondcategory',
          type: 'collection'
        },
        startsite: {
          __meta__: {
            createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            createdDate: '2018-05-27T15:54:27.961Z',
            lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            lastModifiedDate: '2018-05-30T17:23:55.850Z'
          },
          description: 'Texte und Bilder für die Startseite',
          enabled: true,
          fields: [
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: true,
                    message: '^Field is required'
                  },
                  uniqueKey: 'S1yTaIYJX'
                }
              ],
              defaultValue: '',
              description:
                'Text welcher in der Mitte des Bildes auf der Startseite angetzeigt wird',
              gridColumns: {
                lg: 12,
                md: 12,
                sm: 12,
                xs: 12
              },
              id: 1527436133336,
              key: 'text',
              show: true,
              title: 'Text',
              type: 'text'
            },
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: true,
                    message: '^Field is required'
                  },
                  uniqueKey: 'ry5ia8Y17'
                }
              ],
              description: 'Start Bild für große Bildschirme',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1527436196999,
              key: 'bigStartImage',
              limit: 1,
              mediaTypes: ['images'],
              show: true,
              title: 'Big Start Image',
              type: 'media'
            },
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: true,
                    message: '^Field is required'
                  },
                  uniqueKey: 'H1ZhaIYy7'
                }
              ],
              description: 'Start Bild für mittel große Bildschirme',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1527436307772,
              key: 'mediumStartImage',
              limit: 1,
              mediaTypes: ['images'],
              show: true,
              title: 'Medium Start Image',
              type: 'media'
            },
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: true,
                    message: '^Field is required'
                  },
                  uniqueKey: 'H1Y36IKJm'
                }
              ],
              description: 'Start Bild für kleine Bildschirme',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1527436415580,
              key: 'smallStartImage',
              limit: 1,
              mediaTypes: ['images'],
              show: true,
              title: 'Small Start Image',
              type: 'media'
            }
          ],
          group: 'Startsite',
          icon: '',
          id: 'startsite',
          sortable: true,
          title: 'Startsite',
          type: 'single'
        }
      }
    },
    production: {
      __meta__: {
        createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
        createdDate: '2018-09-26T16:32:39.289Z'
      },
      content: {
        anzel: {
          'en-US': {
            '1551101149868': {
              __meta__: {
                createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                createdDate: '2019-02-25T13:25:49.868Z',
                lastModifiedBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                lastModifiedDate: '2019-02-25T13:26:10.959Z'
              },
              field_1551101112623: [
                5,
                'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                'miWs1rZibFUAEFO40j7P8r9EBEB3',
                'mvSiGccPYHSfOzbwR8TdrJEDTRH3'
              ],
              id: 1551101149868
            }
          }
        },
        dataProtection: {
          'en-US': {
            __meta__: {
              createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
              createdDate: '2018-06-20T17:40:51.461Z',
              lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
              lastModifiedDate: '2018-10-15T16:16:55.336Z'
            },
            id: 'dataProtection',
            text:
              '<h2>Datenschutzerkl&auml;rung</h2>\n\n<h3>&nbsp;</h3>\n\n<p>Diese Datenschutzerkl&auml;rung kl&auml;rt Sie &uuml;ber die Art, den Umfang und Zweck der Verarbeitung von personenbezogenen Daten (nachfolgend kurz &bdquo;Daten&ldquo;) im Rahmen der Erbringung unserer Leistungen sowie innerhalb unseres Onlineangebotes und der mit ihm verbundenen Webseiten, Funktionen und Inhalte sowie externen Onlinepr&auml;senzen, wie z.B. unser Social Media Profile auf (nachfolgend gemeinsam bezeichnet als &bdquo;Onlineangebot&ldquo;). Im Hinblick auf die verwendeten Begrifflichkeiten, wie z.B. &bdquo;Verarbeitung&ldquo; oder &bdquo;Verantwortlicher&ldquo; verweisen wir auf die Definitionen im Art. 4 der Datenschutzgrundverordnung (DSGVO).<br />\n&nbsp;</p>\n\n<h3>Verantwortlicher</h3>\n\n<p>Vorname, Name / Firma<br />\nStra&szlig;e, Hausnr.<br />\nPLZ, Ort, Land<br />\nE-Mailadresse: ....@....de<br />\nGesch&auml;ftsf&uuml;hrer/ Inhaber: Vorname/n, Namen/n (sofern vorhanden)<br />\nLink zum Impressum: http://....de<br />\nKontakt Datenschutzbeauftragte/r: &hellip;.@&hellip;.de (sofern vorhanden)</p>\n\n<h3>Arten der verarbeiteten Daten</h3>\n\n<p>- Bestandsdaten (z.B., Personen-Stammdaten, Namen oder Adressen).<br />\n- Kontaktdaten (z.B., E-Mail, Telefonnummern).<br />\n- Inhaltsdaten (z.B., Texteingaben, Fotografien, Videos).<br />\n- Nutzungsdaten (z.B., besuchte Webseiten, Interesse an Inhalten, Zugriffszeiten).<br />\n- Meta-/Kommunikationsdaten (z.B., Ger&auml;te-Informationen, IP-Adressen).</p>\n\n<h3>Kategorien betroffener Personen</h3>\n\n<p>Besucher und Nutzer des Onlineangebotes (Nachfolgend bezeichnen wir die betroffenen Personen zusammenfassend auch als &bdquo;Nutzer&ldquo;).</p>\n\n<h3>Zweck der Verarbeitung</h3>\n\n<p>- Zurverf&uuml;gungstellung des Onlineangebotes, seiner Funktionen und Inhalte.<br />\n- Beantwortung von Kontaktanfragen und Kommunikation mit Nutzern.<br />\n- Sicherheitsma&szlig;nahmen.<br />\n- Reichweitenmessung/Marketing</p>\n\n<h3>Verwendete Begrifflichkeiten</h3>\n\n<p>&bdquo;Personenbezogene Daten&ldquo; sind alle Informationen, die sich auf eine identifizierte oder identifizierbare nat&uuml;rliche Person (im Folgenden &bdquo;betroffene Person&ldquo;) beziehen; als identifizierbar wird eine nat&uuml;rliche Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung (z.B. Cookie) oder zu einem oder mehreren besonderen Merkmalen identifiziert werden kann, die Ausdruck der physischen, physiologischen, genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen Identit&auml;t dieser nat&uuml;rlichen Person sind.<br />\n<br />\n&bdquo;Verarbeitung&ldquo; ist jeder mit oder ohne Hilfe automatisierter Verfahren ausgef&uuml;hrte Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten. Der Begriff reicht weit und umfasst praktisch jeden Umgang mit Daten.<br />\n<br />\n&bdquo;Pseudonymisierung&ldquo; die Verarbeitung personenbezogener Daten in einer Weise, dass die personenbezogenen Daten ohne Hinzuziehung zus&auml;tzlicher Informationen nicht mehr einer spezifischen betroffenen Person zugeordnet werden k&ouml;nnen, sofern diese zus&auml;tzlichen Informationen gesondert aufbewahrt werden und technischen und organisatorischen Ma&szlig;nahmen unterliegen, die gew&auml;hrleisten, dass die personenbezogenen Daten nicht einer identifizierten oder identifizierbaren nat&uuml;rlichen Person zugewiesen werden.<br />\n<br />\n&bdquo;Profiling&ldquo; jede Art der automatisierten Verarbeitung personenbezogener Daten, die darin besteht, dass diese personenbezogenen Daten verwendet werden, um bestimmte pers&ouml;nliche Aspekte, die sich auf eine nat&uuml;rliche Person beziehen, zu bewerten, insbesondere um Aspekte bez&uuml;glich Arbeitsleistung, wirtschaftliche Lage, Gesundheit, pers&ouml;nliche Vorlieben, Interessen, Zuverl&auml;ssigkeit, Verhalten, Aufenthaltsort oder Ortswechsel dieser nat&uuml;rlichen Person zu analysieren oder vorherzusagen.<br />\n<br />\nAls &bdquo;Verantwortlicher&ldquo; wird die nat&uuml;rliche oder juristische Person, Beh&ouml;rde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen &uuml;ber die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet, bezeichnet.<br />\n<br />\n&bdquo;Auftragsverarbeiter&ldquo; eine nat&uuml;rliche oder juristische Person, Beh&ouml;rde, Einrichtung oder andere Stelle, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet.</p>\n\n<h3>Ma&szlig;gebliche Rechtsgrundlagen</h3>\n\n<p>Nach Ma&szlig;gabe des Art. 13 DSGVO teilen wir Ihnen die Rechtsgrundlagen unserer Datenverarbeitungen mit. F&uuml;r Nutzer aus dem Geltungsbereich der Datenschutzgrundverordnung (DSGVO), d.h. der EU und des EWG gilt, sofern die Rechtsgrundlage in der Datenschutzerkl&auml;rung nicht genannt wird, Folgendes:<br />\nDie Rechtsgrundlage f&uuml;r die Einholung von Einwilligungen ist Art. 6 Abs. 1 lit. a und Art. 7 DSGVO;<br />\nDie Rechtsgrundlage f&uuml;r die Verarbeitung zur Erf&uuml;llung unserer Leistungen und Durchf&uuml;hrung vertraglicher Ma&szlig;nahmen sowie Beantwortung von Anfragen ist Art. 6 Abs. 1 lit. b DSGVO;<br />\nDie Rechtsgrundlage f&uuml;r die Verarbeitung zur Erf&uuml;llung unserer rechtlichen Verpflichtungen ist Art. 6 Abs. 1 lit. c DSGVO;<br />\nF&uuml;r den Fall, dass lebenswichtige Interessen der betroffenen Person oder einer anderen nat&uuml;rlichen Person eine Verarbeitung personenbezogener Daten erforderlich machen, dient Art. 6 Abs. 1 lit. d DSGVO als Rechtsgrundlage.<br />\nDie Rechtsgrundlage f&uuml;r die erforderliche Verarbeitung zur Wahrnehmung einer Aufgabe, die im &ouml;ffentlichen Interesse liegt oder in Aus&uuml;bung &ouml;ffentlicher Gewalt erfolgt, die dem Verantwortlichen &uuml;bertragen wurde ist Art. 6 Abs. 1 lit. e DSGVO.<br />\nDie Rechtsgrundlage f&uuml;r die Verarbeitung zur Wahrung unserer berechtigten Interessen ist Art. 6 Abs. 1 lit. f DSGVO.<br />\nDie Verarbeitung von Daten zu anderen Zwecken als denen, zu denen sie ehoben wurden, bestimmt sich nach den Vorgaben des Art 6 Abs. 4 DSGVO.<br />\nDie Verarbeitung von besonderen Kategorien von Daten (entsprechend Art. 9 Abs. 1 DSGVO) bestimmt sich nach den Vorgaben des Art. 9 Abs. 2 DSGVO.</p>\n\n<h3>Sicherheitsma&szlig;nahmen</h3>\n\n<p>Wir treffen nach Ma&szlig;gabe der gesetzlichen Vorgabenunter Ber&uuml;cksichtigung des Stands der Technik, der Implementierungskosten und der Art, des Umfangs, der Umst&auml;nde und der Zwecke der Verarbeitung sowie der unterschiedlichen Eintrittswahrscheinlichkeit und Schwere des Risikos f&uuml;r die Rechte und Freiheiten nat&uuml;rlicher Personen, geeignete technische und organisatorische Ma&szlig;nahmen, um ein dem Risiko angemessenes Schutzniveau zu gew&auml;hrleisten.<br />\n<br />\nZu den Ma&szlig;nahmen geh&ouml;ren insbesondere die Sicherung der Vertraulichkeit, Integrit&auml;t und Verf&uuml;gbarkeit von Daten durch Kontrolle des physischen Zugangs zu den Daten, als auch des sie betreffenden Zugriffs, der Eingabe, Weitergabe, der Sicherung der Verf&uuml;gbarkeit und ihrer Trennung. Des Weiteren haben wir Verfahren eingerichtet, die eine Wahrnehmung von Betroffenenrechten, L&ouml;schung von Daten und Reaktion auf Gef&auml;hrdung der Daten gew&auml;hrleisten. Ferner ber&uuml;cksichtigen wir den Schutz personenbezogener Daten bereits bei der Entwicklung, bzw. Auswahl von Hardware, Software sowie Verfahren, entsprechend dem Prinzip des Datenschutzes durch Technikgestaltung und durch datenschutzfreundliche Voreinstellungen.</p>\n\n<h3>Zusammenarbeit mit Auftragsverarbeitern, gemeinsam Verantwortlichen und Dritten</h3>\n\n<p>Sofern wir im Rahmen unserer Verarbeitung Daten gegen&uuml;ber anderen Personen und Unternehmen (Auftragsverarbeitern, gemeinsam Verantwortlichen oder Dritten) offenbaren, sie an diese &uuml;bermitteln oder ihnen sonst Zugriff auf die Daten gew&auml;hren, erfolgt dies nur auf Grundlage einer gesetzlichen Erlaubnis (z.B. wenn eine &Uuml;bermittlung der Daten an Dritte, wie an Zahlungsdienstleister, zur Vertragserf&uuml;llung erforderlich ist), Nutzer eingewilligt haben, eine rechtliche Verpflichtung dies vorsieht oder auf Grundlage unserer berechtigten Interessen (z.B. beim Einsatz von Beauftragten, Webhostern, etc.).<br />\n<br />\nSofern wir Daten anderen Unternehmen unserer Unternehmensgruppe offenbaren, &uuml;bermitteln oder ihnen sonst den Zugriff gew&auml;hren, erfolgt dies insbesondere zu administrativen Zwecken als berechtigtes Interesse und dar&uuml;berhinausgehend auf einer den gesetzlichen Vorgaben entsprechenden Grundlage.</p>\n\n<h3>&Uuml;bermittlungen in Drittl&auml;nder</h3>\n\n<p>Sofern wir Daten in einem Drittland (d.h. au&szlig;erhalb der Europ&auml;ischen Union (EU), des Europ&auml;ischen Wirtschaftsraums (EWR) oder der Schweizer Eidgenossenschaft) verarbeiten oder dies im Rahmen der Inanspruchnahme von Diensten Dritter oder Offenlegung, bzw. &Uuml;bermittlung von Daten an andere Personen oder Unternehmen geschieht, erfolgt dies nur, wenn es zur Erf&uuml;llung unserer (vor)vertraglichen Pflichten, auf Grundlage Ihrer Einwilligung, aufgrund einer rechtlichen Verpflichtung oder auf Grundlage unserer berechtigten Interessen geschieht. Vorbehaltlich gesetzlicher oder vertraglicher Erlaubnisse, verarbeiten oder lassen wir die Daten in einem Drittland nur beim Vorliegen der gesetzlichen Voraussetzungen. D.h. die Verarbeitung erfolgt z.B. auf Grundlage besonderer Garantien, wie der offiziell anerkannten Feststellung eines der EU entsprechenden Datenschutzniveaus (z.B. f&uuml;r die USA durch das &bdquo;Privacy Shield&ldquo;) oder Beachtung offiziell anerkannter spezieller vertraglicher Verpflichtungen.</p>\n\n<h3>Rechte der betroffenen Personen</h3>\n\n<p>Sie haben das Recht, eine Best&auml;tigung dar&uuml;ber zu verlangen, ob betreffende Daten verarbeitet werden und auf Auskunft &uuml;ber diese Daten sowie auf weitere Informationen und Kopie der Daten entsprechend den gesetzlichen Vorgaben.<br />\n<br />\nSie haben entsprechend. den gesetzlichen Vorgaben das Recht, die Vervollst&auml;ndigung der Sie betreffenden Daten oder die Berichtigung der Sie betreffenden unrichtigen Daten zu verlangen.<br />\n<br />\nSie haben nach Ma&szlig;gabe der gesetzlichen Vorgaben das Recht zu verlangen, dass betreffende Daten unverz&uuml;glich gel&ouml;scht werden, bzw. alternativ nach Ma&szlig;gabe der gesetzlichen Vorgaben eine Einschr&auml;nkung der Verarbeitung der Daten zu verlangen.<br />\n<br />\nSie haben das Recht zu verlangen, dass die Sie betreffenden Daten, die Sie uns bereitgestellt haben nach Ma&szlig;gabe der gesetzlichen Vorgaben zu erhalten und deren &Uuml;bermittlung an andere Verantwortliche zu fordern.<br />\n<br />\nSie haben ferner nach Ma&szlig;gabe der gesetzlichen Vorgaben das Recht, eine Beschwerde bei der zust&auml;ndigen Aufsichtsbeh&ouml;rde einzureichen.</p>\n\n<h3>Widerrufsrecht</h3>\n\n<p>Sie haben das Recht, erteilte Einwilligungen mit Wirkung f&uuml;r die Zukunft zu widerrufen.</p>\n\n<h3>Widerspruchsrecht</h3>\n\n<p><strong>Sie k&ouml;nnen der k&uuml;nftigen Verarbeitung der Sie betreffenden Daten nach Ma&szlig;gabe der gesetzlichen Vorgaben jederzeit widersprechen. Der Widerspruch kann insbesondere gegen die Verarbeitung f&uuml;r Zwecke der Direktwerbung erfolgen.</strong></p>\n\n<h3>Cookies und Widerspruchsrecht bei Direktwerbung</h3>\n\n<p>Als &bdquo;Cookies&ldquo; werden kleine Dateien bezeichnet, die auf Rechnern der Nutzer gespeichert werden. Innerhalb der Cookies k&ouml;nnen unterschiedliche Angaben gespeichert werden. Ein Cookie dient prim&auml;r dazu, die Angaben zu einem Nutzer (bzw. dem Ger&auml;t auf dem das Cookie gespeichert ist) w&auml;hrend oder auch nach seinem Besuch innerhalb eines Onlineangebotes zu speichern. Als tempor&auml;re Cookies, bzw. &bdquo;Session-Cookies&ldquo; oder &bdquo;transiente Cookies&ldquo;, werden Cookies bezeichnet, die gel&ouml;scht werden, nachdem ein Nutzer ein Onlineangebot verl&auml;sst und seinen Browser schlie&szlig;t. In einem solchen Cookie kann z.B. der Inhalt eines Warenkorbs in einem Onlineshop oder ein Login-Status gespeichert werden. Als &bdquo;permanent&ldquo; oder &bdquo;persistent&ldquo; werden Cookies bezeichnet, die auch nach dem Schlie&szlig;en des Browsers gespeichert bleiben. So kann z.B. der Login-Status gespeichert werden, wenn die Nutzer diese nach mehreren Tagen aufsuchen. Ebenso k&ouml;nnen in einem solchen Cookie die Interessen der Nutzer gespeichert werden, die f&uuml;r Reichweitenmessung oder Marketingzwecke verwendet werden. Als &bdquo;Third-Party-Cookie&ldquo; werden Cookies bezeichnet, die von anderen Anbietern als dem Verantwortlichen, der das Onlineangebot betreibt, angeboten werden (andernfalls, wenn es nur dessen Cookies sind spricht man von &bdquo;First-Party Cookies&ldquo;).<br />\n<br />\nWir k&ouml;nnen tempor&auml;re und permanente Cookies einsetzen und kl&auml;ren hier&uuml;ber im Rahmen unserer Datenschutzerkl&auml;rung auf.<br />\n<br />\nFalls die Nutzer nicht m&ouml;chten, dass Cookies auf ihrem Rechner gespeichert werden, werden sie gebeten die entsprechende Option in den Systemeinstellungen ihres Browsers zu deaktivieren. Gespeicherte Cookies k&ouml;nnen in den Systemeinstellungen des Browsers gel&ouml;scht werden. Der Ausschluss von Cookies kann zu Funktionseinschr&auml;nkungen dieses Onlineangebotes f&uuml;hren.<br />\n<br />\nEin genereller Widerspruch gegen den Einsatz der zu Zwecken des Onlinemarketing eingesetzten Cookies kann bei einer Vielzahl der Dienste, vor allem im Fall des Trackings, &uuml;ber die US-amerikanische Seite <a href="http://www.aboutads.info/choices/">http://www.aboutads.info/choices/</a> oder die EU-Seite <a href="http://www.youronlinechoices.com/">http://www.youronlinechoices.com/</a> erkl&auml;rt werden. Des Weiteren kann die Speicherung von Cookies mittels deren Abschaltung in den Einstellungen des Browsers erreicht werden. Bitte beachten Sie, dass dann gegebenenfalls nicht alle Funktionen dieses Onlineangebotes genutzt werden k&ouml;nnen.</p>\n\n<h3>L&ouml;schung von Daten</h3>\n\n<p>Die von uns verarbeiteten Daten werden nach Ma&szlig;gabe der gesetzlichen Vorgaben gel&ouml;scht oder in ihrer Verarbeitung eingeschr&auml;nkt. Sofern nicht im Rahmen dieser Datenschutzerkl&auml;rung ausdr&uuml;cklich angegeben, werden die bei uns gespeicherten Daten gel&ouml;scht, sobald sie f&uuml;r ihre Zweckbestimmung nicht mehr erforderlich sind und der L&ouml;schung keine gesetzlichen Aufbewahrungspflichten entgegenstehen.<br />\n<br />\nSofern die Daten nicht gel&ouml;scht werden, weil sie f&uuml;r andere und gesetzlich zul&auml;ssige Zwecke erforderlich sind, wird deren Verarbeitung eingeschr&auml;nkt. D.h. die Daten werden gesperrt und nicht f&uuml;r andere Zwecke verarbeitet. Das gilt z.B. f&uuml;r Daten, die aus handels- oder steuerrechtlichen Gr&uuml;nden aufbewahrt werden m&uuml;ssen.</p>\n\n<h3>&Auml;nderungen und Aktualisierungen der Datenschutzerkl&auml;rung</h3>\n\n<p>Wir bitten Sie sich regelm&auml;&szlig;ig &uuml;ber den Inhalt unserer Datenschutzerkl&auml;rung zu informieren. Wir passen die Datenschutzerkl&auml;rung an, sobald die &Auml;nderungen der von uns durchgef&uuml;hrten Datenverarbeitungen dies erforderlich machen. Wir informieren Sie, sobald durch die &Auml;nderungen eine Mitwirkungshandlung Ihrerseits (z.B. Einwilligung) oder eine sonstige individuelle Benachrichtigung erforderlich wird.</p>\n\n<p>&nbsp;</p>\n\n<h3>Gesch&auml;ftsbezogene Verarbeitung</h3>\n\n<p>&nbsp;</p>\n\n<p>Zus&auml;tzlich verarbeiten wir<br />\n- Vertragsdaten (z.B., Vertragsgegenstand, Laufzeit, Kundenkategorie).<br />\n- Zahlungsdaten (z.B., Bankverbindung, Zahlungshistorie)<br />\nvon unseren Kunden, Interessenten und Gesch&auml;ftspartner zwecks Erbringung vertraglicher Leistungen, Service und Kundenpflege, Marketing, Werbung und Marktforschung.</p>\n\n<p>&nbsp;</p>\n\n<h3>Teilnahme an Affiliate-Partnerprogrammen</h3>\n\n<p>&nbsp;</p>\n\n<p>Innerhalb unseres Onlineangebotes setzen wir auf Grundlage unserer berechtigten Interessen (d.h. Interesse an der Analyse, Optimierung und wirtschaftlichem Betrieb unseres Onlineangebotes) gem. Art. 6 Abs. 1 lit. f DSGVO branchen&uuml;bliche Trackingma&szlig;nahmen ein, soweit diese f&uuml;r den Betrieb des Affiliatesystems erforderlich sind. Nachfolgend kl&auml;ren wir die Nutzer &uuml;ber die technischen Hintergr&uuml;nde auf.<br />\n<br />\nDie von unseren Vertragspartnern angebotene Leistungen k&ouml;nnen auch auf anderen Webseiten beworben und verlinkt werden (sog. Affiliate-Links oder After-Buy-Systeme, wenn z.B. Links oder Leistungen Dritter nach einem Vertragsschluss angeboten werden). Die Betreiber der jeweiligen Webseiten erhalten eine Provision, wenn Nutzer den Affiliate-Links folgen und anschlie&szlig;end die Angebote wahrnehmen.<br />\n<br />\nZusammenfassend, ist es f&uuml;r unser Onlineangebot erforderlich, dass wir nachverfolgen k&ouml;nnen, ob Nutzer, die sich f&uuml;r Affiliate-Links und/oder die bei uns verf&uuml;gbaren Angebote interessieren, die Angebote anschlie&szlig;end auf die Veranlassung der Affiliate-Links oder unserer Onlineplattform, wahrnehmen. Hierzu werden die Affiliate-Links und unsere Angebote um bestimmte Werte erg&auml;nzt, die ein Bestandteil des Links oder anderweitig, z.B. in einem Cookie, gesetzt werden k&ouml;nnen. Zu den Werten geh&ouml;ren insbesondere die Ausgangswebseite (Referrer), Zeitpunkt, eine Online-Kennung der Betreiber der Webseite, auf der sich der Affiliate-Link befand, eine Online-Kennung des jeweiligen Angebotes, eine Online-Kennung des Nutzers, als auch Tracking-spezifische Werte wie z.B. Werbemittel-ID, Partner-ID und Kategorisierungen.<br />\n<br />\nBei der von uns verwendeten Online-Kennungen der Nutzer, handelt es sich um pseudonyme Werte. D.h. die Online-Kennungen enthalten selbst keine personenbezogenen Daten wie Namen oder E-Mailadressen. Sie helfen uns nur zu bestimmen ob derselbe Nutzer, der auf einen Affiliate-Link geklickt oder sich &uuml;ber unser Onlineangebot f&uuml;r ein Angebot interessiert hat, das Angebot wahrgenommen, d.h. z.B. einen Vertrag mit dem Anbieter abgeschlossen hat. Die Online-Kennung ist jedoch insoweit personenbezogen, als dem Partnerunternehmen und auch uns, die Online-Kennung zusammen mit anderen Nutzerdaten vorliegen. Nur so kann das Partnerunternehmen uns mitteilen, ob derjenige Nutzer das Angebot wahrgenommen hat und wir z.B. den Bonus auszahlen k&ouml;nnen.</p>\n\n<p>&nbsp;</p>\n\n<h3>Amazon-Partnerprogramm</h3>\n\n<p>&nbsp;</p>\n\n<p>Wir sind auf Grundlage unserer berechtigten Interessen (d.h. Interesse am wirtschaftlichem Betrieb unseres Onlineangebotes im Sinne des Art. 6 Abs. 1 lit. f. DSGVO) Teilnehmer des Partnerprogramms von Amazon EU, das zur Bereitstellung eines Mediums f&uuml;r Websites konzipiert wurde, mittels dessen durch die Platzierung von Werbeanzeigen und Links zu Amazon.de Werbekostenerstattung verdient werden kann (sog. Affiliate-System). D.h. als Amazon-Partner verdienen wir an qualifizierten K&auml;ufen.<br />\n<br />\nAmazon setzt Cookies ein, um die Herkunft der Bestellungen nachvollziehen zu k&ouml;nnen. Unter anderem kann Amazon erkennen, dass Sie den Partnerlink auf dieser Website geklickt und anschlie&szlig;end ein Produkt bei Amazon erworben haben.<br />\n<br />\nWeitere Informationen zur Datennutzung durch Amazon und Widerspruchsm&ouml;glichkeiten erhalten Sie in der Datenschutzerkl&auml;rung des Unternehmens: <a href="https://www.amazon.de/gp/help/customer/display.html?nodeId=201909010" target="_blank">https://www.amazon.de/gp/help/customer/display.html?nodeId=201909010</a>.<br />\n<br />\nHinweis: Amazon und das Amazon-Logo sind Warenzeichen von Amazon.com, Inc. oder eines seiner verbundenen Unternehmen.</p>\n\n<p>&nbsp;</p>\n\n<h3>Hosting und E-Mail-Versand</h3>\n\n<p>&nbsp;</p>\n\n<p>Die von uns in Anspruch genommenen Hosting-Leistungen dienen der Zurverf&uuml;gungstellung der folgenden Leistungen: Infrastruktur- und Plattformdienstleistungen, Rechenkapazit&auml;t, Speicherplatz und Datenbankdienste, E-Mail-Versand, Sicherheitsleistungen sowie technische Wartungsleistungen, die wir zum Zwecke des Betriebs dieses Onlineangebotes einsetzen.<br />\n<br />\nHierbei verarbeiten wir, bzw. unser Hostinganbieter Bestandsdaten, Kontaktdaten, Inhaltsdaten, Vertragsdaten, Nutzungsdaten, Meta- und Kommunikationsdaten von Kunden, Interessenten und Besuchern dieses Onlineangebotes auf Grundlage unserer berechtigten Interessen an einer effizienten und sicheren Zurverf&uuml;gungstellung dieses Onlineangebotes gem. Art. 6 Abs. 1 lit. f DSGVO i.V.m. Art. 28 DSGVO (Abschluss Auftragsverarbeitungsvertrag).</p>\n\n<p>&nbsp;</p>\n\n<h3>Erhebung von Zugriffsdaten und Logfiles</h3>\n\n<p>&nbsp;</p>\n\n<p>Wir, bzw. unser Hostinganbieter, erhebt auf Grundlage unserer berechtigten Interessen im Sinne des Art. 6 Abs. 1 lit. f. DSGVO Daten &uuml;ber jeden Zugriff auf den Server, auf dem sich dieser Dienst befindet (sogenannte Serverlogfiles). Zu den Zugriffsdaten geh&ouml;ren Name der abgerufenen Webseite, Datei, Datum und Uhrzeit des Abrufs, &uuml;bertragene Datenmenge, Meldung &uuml;ber erfolgreichen Abruf, Browsertyp nebst Version, das Betriebssystem des Nutzers, Referrer URL (die zuvor besuchte Seite), IP-Adresse und der anfragende Provider.<br />\n<br />\nLogfile-Informationen werden aus Sicherheitsgr&uuml;nden (z.B. zur Aufkl&auml;rung von Missbrauchs- oder Betrugshandlungen) f&uuml;r die Dauer von maximal 7 Tagen gespeichert und danach gel&ouml;scht. Daten, deren weitere Aufbewahrung zu Beweiszwecken erforderlich ist, sind bis zur endg&uuml;ltigen Kl&auml;rung des jeweiligen Vorfalls von der L&ouml;schung ausgenommen.</p>\n\n<p>&nbsp;</p>\n\n<h3>Google Fonts</h3>\n\n<p>&nbsp;</p>\n\n<p>Wir binden die Schriftarten (&quot;Google Fonts&quot;) des Anbieters Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA, ein. Datenschutzerkl&auml;rung: <a href="https://www.google.com/policies/privacy/" target="_blank">https://www.google.com/policies/privacy/</a>, Opt-Out: <a href="https://adssettings.google.com/authenticated" target="_blank">https://adssettings.google.com/authenticated</a>.</p>\n\n<h1><a href="https://datenschutz-generator.de" rel="nofollow" target="_blank">Erstellt mit Datenschutz-Generator.de von RA Dr. Thomas Schwenke</a></h1>\n\n<h1>&nbsp;</h1>\n\n<h1>Datenschutzerkl&auml;rung</h1>\n\n<p>Wir freuen uns sehr &uuml;ber Ihr Interesse an unserem Unternehmen. Datenschutz hat einen besonders hohen Stellenwert f&uuml;r die Gesch&auml;ftsleitung der Firmenname. Eine Nutzung der Internetseiten der Firmenname ist grunds&auml;tzlich ohne jede Angabe personenbezogener Daten m&ouml;glich. Sofern eine betroffene Person besondere Services unseres Unternehmens &uuml;ber unsere Internetseite in Anspruch nehmen m&ouml;chte, k&ouml;nnte jedoch eine Verarbeitung personenbezogener Daten erforderlich werden. Ist die Verarbeitung personenbezogener Daten erforderlich und besteht f&uuml;r eine solche Verarbeitung keine gesetzliche Grundlage, holen wir generell eine Einwilligung der betroffenen Person ein.</p>\n\n<p>Die Verarbeitung personenbezogener Daten, beispielsweise des Namens, der Anschrift, E-Mail-Adresse oder Telefonnummer einer betroffenen Person, erfolgt stets im Einklang mit der Datenschutz-Grundverordnung und in &Uuml;bereinstimmung mit den f&uuml;r die Firmenname geltenden landesspezifischen Datenschutzbestimmungen. Mittels dieser Datenschutzerkl&auml;rung m&ouml;chte unser Unternehmen die &Ouml;ffentlichkeit &uuml;ber Art, Umfang und Zweck der von uns erhobenen, genutzten und verarbeiteten personenbezogenen Daten informieren. Ferner werden betroffene Personen mittels dieser Datenschutzerkl&auml;rung &uuml;ber die ihnen zustehenden Rechte aufgekl&auml;rt.</p>\n\n<p>Die Firmenname hat als f&uuml;r die Verarbeitung Verantwortlicher zahlreiche technische und organisatorische Ma&szlig;nahmen umgesetzt, um einen m&ouml;glichst l&uuml;ckenlosen Schutz der &uuml;ber diese Internetseite verarbeiteten personenbezogenen Daten sicherzustellen. Dennoch k&ouml;nnen Internetbasierte Daten&uuml;bertragungen grunds&auml;tzlich Sicherheitsl&uuml;cken aufweisen, sodass ein absoluter Schutz nicht gew&auml;hrleistet werden kann. Aus diesem Grund steht es jeder betroffenen Person frei, personenbezogene Daten auch auf alternativen Wegen, beispielsweise telefonisch, an uns zu &uuml;bermitteln.</p>\n\n<h2>1. Begriffsbestimmungen</h2>\n\n<p>Die Datenschutzerkl&auml;rung der Firmenname beruht auf den Begrifflichkeiten, die durch den Europ&auml;ischen Richtlinien- und Verordnungsgeber beim Erlass der Datenschutz-Grundverordnung (DS-GVO) verwendet wurden. Unsere Datenschutzerkl&auml;rung soll sowohl f&uuml;r die &Ouml;ffentlichkeit als auch f&uuml;r unsere Kunden und Gesch&auml;ftspartner einfach lesbar und verst&auml;ndlich sein. Um dies zu gew&auml;hrleisten, m&ouml;chten wir vorab die verwendeten Begrifflichkeiten erl&auml;utern.</p>\n\n<p>Wir verwenden in dieser Datenschutzerkl&auml;rung unter anderem die folgenden Begriffe:</p>\n\n<ul>\n\t<li>\n\t<h3>a)&nbsp;&nbsp;&nbsp; personenbezogene Daten</h3>\n\n\t<p>Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare nat&uuml;rliche Person (im Folgenden &bdquo;betroffene Person&ldquo;) beziehen. Als identifizierbar wird eine nat&uuml;rliche Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung oder zu einem oder mehreren besonderen Merkmalen, die Ausdruck der physischen, physiologischen, genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen Identit&auml;t dieser nat&uuml;rlichen Person sind, identifiziert werden kann.</p>\n\t</li>\n\t<li>\n\t<h3>b)&nbsp;&nbsp;&nbsp; betroffene Person</h3>\n\n\t<p>Betroffene Person ist jede identifizierte oder identifizierbare nat&uuml;rliche Person, deren personenbezogene Daten von dem f&uuml;r die Verarbeitung Verantwortlichen verarbeitet werden.</p>\n\t</li>\n\t<li>\n\t<h3>c)&nbsp;&nbsp;&nbsp; Verarbeitung</h3>\n\n\t<p>Verarbeitung ist jeder mit oder ohne Hilfe automatisierter Verfahren ausgef&uuml;hrte Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten wie das Erheben, das Erfassen, die Organisation, das Ordnen, die Speicherung, die Anpassung oder Ver&auml;nderung, das Auslesen, das Abfragen, die Verwendung, die Offenlegung durch &Uuml;bermittlung, Verbreitung oder eine andere Form der Bereitstellung, den Abgleich oder die Verkn&uuml;pfung, die Einschr&auml;nkung, das L&ouml;schen oder die Vernichtung.</p>\n\t</li>\n\t<li>\n\t<h3>d)&nbsp;&nbsp;&nbsp; Einschr&auml;nkung der Verarbeitung</h3>\n\n\t<p>Einschr&auml;nkung der Verarbeitung ist die Markierung gespeicherter personenbezogener Daten mit dem Ziel, ihre k&uuml;nftige Verarbeitung einzuschr&auml;nken.</p>\n\t</li>\n\t<li>\n\t<h3>e)&nbsp;&nbsp;&nbsp; Profiling</h3>\n\n\t<p>Profiling ist jede Art der automatisierten Verarbeitung personenbezogener Daten, die darin besteht, dass diese personenbezogenen Daten verwendet werden, um bestimmte pers&ouml;nliche Aspekte, die sich auf eine nat&uuml;rliche Person beziehen, zu bewerten, insbesondere, um Aspekte bez&uuml;glich Arbeitsleistung, wirtschaftlicher Lage, Gesundheit, pers&ouml;nlicher Vorlieben, Interessen, Zuverl&auml;ssigkeit, Verhalten, Aufenthaltsort oder Ortswechsel dieser nat&uuml;rlichen Person zu analysieren oder vorherzusagen.</p>\n\t</li>\n\t<li>\n\t<h3>f)&nbsp;&nbsp;&nbsp;&nbsp; Pseudonymisierung</h3>\n\n\t<p>Pseudonymisierung ist die Verarbeitung personenbezogener Daten in einer Weise, auf welche die personenbezogenen Daten ohne Hinzuziehung zus&auml;tzlicher Informationen nicht mehr einer spezifischen betroffenen Person zugeordnet werden k&ouml;nnen, sofern diese zus&auml;tzlichen Informationen gesondert aufbewahrt werden und technischen und organisatorischen Ma&szlig;nahmen unterliegen, die gew&auml;hrleisten, dass die personenbezogenen Daten nicht einer identifizierten oder identifizierbaren nat&uuml;rlichen Person zugewiesen werden.</p>\n\t</li>\n\t<li>\n\t<h3>g)&nbsp;&nbsp;&nbsp; Verantwortlicher oder f&uuml;r die Verarbeitung Verantwortlicher</h3>\n\n\t<p>Verantwortlicher oder f&uuml;r die Verarbeitung Verantwortlicher ist die nat&uuml;rliche oder juristische Person, Beh&ouml;rde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen &uuml;ber die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet. Sind die Zwecke und Mittel dieser Verarbeitung durch das Unionsrecht oder das Recht der Mitgliedstaaten vorgegeben, so kann der Verantwortliche beziehungsweise k&ouml;nnen die bestimmten Kriterien seiner Benennung nach dem Unionsrecht oder dem Recht der Mitgliedstaaten vorgesehen werden.</p>\n\t</li>\n\t<li>\n\t<h3>h)&nbsp;&nbsp;&nbsp; Auftragsverarbeiter</h3>\n\n\t<p>Auftragsverarbeiter ist eine nat&uuml;rliche oder juristische Person, Beh&ouml;rde, Einrichtung oder andere Stelle, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet.</p>\n\t</li>\n\t<li>\n\t<h3>i)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Empf&auml;nger</h3>\n\n\t<p>Empf&auml;nger ist eine nat&uuml;rliche oder juristische Person, Beh&ouml;rde, Einrichtung oder andere Stelle, der personenbezogene Daten offengelegt werden, unabh&auml;ngig davon, ob es sich bei ihr um einen Dritten handelt oder nicht. Beh&ouml;rden, die im Rahmen eines bestimmten Untersuchungsauftrags nach dem Unionsrecht oder dem Recht der Mitgliedstaaten m&ouml;glicherweise personenbezogene Daten erhalten, gelten jedoch nicht als Empf&auml;nger.</p>\n\t</li>\n\t<li>\n\t<h3>j)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dritter</h3>\n\n\t<p>Dritter ist eine nat&uuml;rliche oder juristische Person, Beh&ouml;rde, Einrichtung oder andere Stelle au&szlig;er der betroffenen Person, dem Verantwortlichen, dem Auftragsverarbeiter und den Personen, die unter der unmittelbaren Verantwortung des Verantwortlichen oder des Auftragsverarbeiters befugt sind, die personenbezogenen Daten zu verarbeiten.</p>\n\t</li>\n\t<li>\n\t<h3>k)&nbsp;&nbsp;&nbsp; Einwilligung</h3>\n\n\t<p>Einwilligung ist jede von der betroffenen Person freiwillig f&uuml;r den bestimmten Fall in informierter Weise und unmissverst&auml;ndlich abgegebene Willensbekundung in Form einer Erkl&auml;rung oder einer sonstigen eindeutigen best&auml;tigenden Handlung, mit der die betroffene Person zu verstehen gibt, dass sie mit der Verarbeitung der sie betreffenden personenbezogenen Daten einverstanden ist.</p>\n\t</li>\n</ul>\n\n<h2>2. Name und Anschrift des f&uuml;r die Verarbeitung Verantwortlichen</h2>\n\n<p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung, sonstiger in den Mitgliedstaaten der Europ&auml;ischen Union geltenden Datenschutzgesetze und anderer Bestimmungen mit datenschutzrechtlichem Charakter ist die:</p>\n\n<p>Firmenname</p>\n\n<p>Donaustra&szlig;e 22</p>\n\n<p>94486 Oserhofen</p>\n\n<p>Deutschland</p>\n\n<p>Tel.: 016099746339</p>\n\n<p>E-Mail: dreampresent.development@gmail.com</p>\n\n<p>Website: www.dreampresent.de</p>\n\n<h2>3. Cookies</h2>\n\n<p>Die Internetseiten der Firmenname verwenden Cookies. Cookies sind Textdateien, welche &uuml;ber einen Internetbrowser auf einem Computersystem abgelegt und gespeichert werden.</p>\n\n<p>Zahlreiche Internetseiten und Server verwenden Cookies. Viele Cookies enthalten eine sogenannte Cookie-ID. Eine Cookie-ID ist eine eindeutige Kennung des Cookies. Sie besteht aus einer Zeichenfolge, durch welche Internetseiten und Server dem konkreten Internetbrowser zugeordnet werden k&ouml;nnen, in dem das Cookie gespeichert wurde. Dies erm&ouml;glicht es den besuchten Internetseiten und Servern, den individuellen Browser der betroffenen Person von anderen Internetbrowsern, die andere Cookies enthalten, zu unterscheiden. Ein bestimmter Internetbrowser kann &uuml;ber die eindeutige Cookie-ID wiedererkannt und identifiziert werden.</p>\n\n<p>Durch den Einsatz von Cookies kann die Firmenname den Nutzern dieser Internetseite nutzerfreundlichere Services bereitstellen, die ohne die Cookie-Setzung nicht m&ouml;glich w&auml;ren.</p>\n\n<p>Mittels eines Cookies k&ouml;nnen die Informationen und Angebote auf unserer Internetseite im Sinne des Benutzers optimiert werden. Cookies erm&ouml;glichen uns, wie bereits erw&auml;hnt, die Benutzer unserer Internetseite wiederzuerkennen. Zweck dieser Wiedererkennung ist es, den Nutzern die Verwendung unserer Internetseite zu erleichtern. Der Benutzer einer Internetseite, die Cookies verwendet, muss beispielsweise nicht bei jedem Besuch der Internetseite erneut seine Zugangsdaten eingeben, weil dies von der Internetseite und dem auf dem Computersystem des Benutzers abgelegten Cookie &uuml;bernommen wird. Ein weiteres Beispiel ist das Cookie eines Warenkorbes im Online-Shop. Der Online-Shop merkt sich die Artikel, die ein Kunde in den virtuellen Warenkorb gelegt hat, &uuml;ber ein Cookie.</p>\n\n<p>Die betroffene Person kann die Setzung von Cookies durch unsere Internetseite jederzeit mittels einer entsprechenden Einstellung des genutzten Internetbrowsers verhindern und damit der Setzung von Cookies dauerhaft widersprechen. Ferner k&ouml;nnen bereits gesetzte Cookies jederzeit &uuml;ber einen Internetbrowser oder andere Softwareprogramme gel&ouml;scht werden. Dies ist in allen g&auml;ngigen Internetbrowsern m&ouml;glich. Deaktiviert die betroffene Person die Setzung von Cookies in dem genutzten Internetbrowser, sind unter Umst&auml;nden nicht alle Funktionen unserer Internetseite vollumf&auml;nglich nutzbar.</p>\n\n<h2>4. Erfassung von allgemeinen Daten und Informationen</h2>\n\n<p>Die Internetseite der Firmenname erfasst mit jedem Aufruf der Internetseite durch eine betroffene Person oder ein automatisiertes System eine Reihe von allgemeinen Daten und Informationen. Diese allgemeinen Daten und Informationen werden in den Logfiles des Servers gespeichert. Erfasst werden k&ouml;nnen die (1) verwendeten Browsertypen und Versionen, (2) das vom zugreifenden System verwendete Betriebssystem, (3) die Internetseite, von welcher ein zugreifendes System auf unsere Internetseite gelangt (sogenannte Referrer), (4) die Unterwebseiten, welche &uuml;ber ein zugreifendes System auf unserer Internetseite angesteuert werden, (5) das Datum und die Uhrzeit eines Zugriffs auf die Internetseite, (6) eine Internet-Protokoll-Adresse (IP-Adresse), (7) der Internet-Service-Provider des zugreifenden Systems und (8) sonstige &auml;hnliche Daten und Informationen, die der Gefahrenabwehr im Falle von Angriffen auf unsere informationstechnologischen Systeme dienen.</p>\n\n<p>Bei der Nutzung dieser allgemeinen Daten und Informationen zieht die Firmenname keine R&uuml;ckschl&uuml;sse auf die betroffene Person. Diese Informationen werden vielmehr ben&ouml;tigt, um (1) die Inhalte unserer Internetseite korrekt auszuliefern, (2) die Inhalte unserer Internetseite sowie die Werbung f&uuml;r diese zu optimieren, (3) die dauerhafte Funktionsf&auml;higkeit unserer informationstechnologischen Systeme und der Technik unserer Internetseite zu gew&auml;hrleisten sowie (4) um Strafverfolgungsbeh&ouml;rden im Falle eines Cyberangriffes die zur Strafverfolgung notwendigen Informationen bereitzustellen. Diese anonym erhobenen Daten und Informationen werden durch die Firmenname daher einerseits statistisch und ferner mit dem Ziel ausgewertet, den Datenschutz und die Datensicherheit in unserem Unternehmen zu erh&ouml;hen, um letztlich ein optimales Schutzniveau f&uuml;r die von uns verarbeiteten personenbezogenen Daten sicherzustellen. Die anonymen Daten der Server-Logfiles werden getrennt von allen durch eine betroffene Person angegebenen personenbezogenen Daten gespeichert.</p>\n\n<h2>5. Routinem&auml;&szlig;ige L&ouml;schung und Sperrung von personenbezogenen Daten</h2>\n\n<p>Der f&uuml;r die Verarbeitung Verantwortliche verarbeitet und speichert personenbezogene Daten der betroffenen Person nur f&uuml;r den Zeitraum, der zur Erreichung des Speicherungszwecks erforderlich ist oder sofern dies durch den Europ&auml;ischen Richtlinien- und Verordnungsgeber oder einen anderen Gesetzgeber in Gesetzen oder Vorschriften, welchen der f&uuml;r die Verarbeitung Verantwortliche unterliegt, vorgesehen wurde.</p>\n\n<p>Entf&auml;llt der Speicherungszweck oder l&auml;uft eine vom Europ&auml;ischen Richtlinien- und Verordnungsgeber oder einem anderen zust&auml;ndigen Gesetzgeber vorgeschriebene Speicherfrist ab, werden die personenbezogenen Daten routinem&auml;&szlig;ig und entsprechend den gesetzlichen Vorschriften gesperrt oder gel&ouml;scht.</p>\n\n<h2>6. Rechte der betroffenen Person</h2>\n\n<ul>\n\t<li>\n\t<h3>a)&nbsp;&nbsp;&nbsp; Recht auf Best&auml;tigung</h3>\n\n\t<p>Jede betroffene Person hat das vom Europ&auml;ischen Richtlinien- und Verordnungsgeber einger&auml;umte Recht, von dem f&uuml;r die Verarbeitung Verantwortlichen eine Best&auml;tigung dar&uuml;ber zu verlangen, ob sie betreffende personenbezogene Daten verarbeitet werden. M&ouml;chte eine betroffene Person dieses Best&auml;tigungsrecht in Anspruch nehmen, kann sie sich hierzu jederzeit an einen Mitarbeiter des f&uuml;r die Verarbeitung Verantwortlichen wenden.</p>\n\t</li>\n\t<li>\n\t<h3>b)&nbsp;&nbsp;&nbsp; Recht auf Auskunft</h3>\n\n\t<p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ&auml;ischen Richtlinien- und Verordnungsgeber gew&auml;hrte Recht, jederzeit von dem f&uuml;r die Verarbeitung Verantwortlichen unentgeltliche Auskunft &uuml;ber die zu seiner Person gespeicherten personenbezogenen Daten und eine Kopie dieser Auskunft zu erhalten. Ferner hat der Europ&auml;ische Richtlinien- und Verordnungsgeber der betroffenen Person Auskunft &uuml;ber folgende Informationen zugestanden:</p>\n\n\t<ul>\n\t\t<li>die Verarbeitungszwecke</li>\n\t\t<li>die Kategorien personenbezogener Daten, die verarbeitet werden</li>\n\t\t<li>die Empf&auml;nger oder Kategorien von Empf&auml;ngern, gegen&uuml;ber denen die personenbezogenen Daten offengelegt worden sind oder noch offengelegt werden, insbesondere bei Empf&auml;ngern in Drittl&auml;ndern oder bei internationalen Organisationen</li>\n\t\t<li>falls m&ouml;glich die geplante Dauer, f&uuml;r die die personenbezogenen Daten gespeichert werden, oder, falls dies nicht m&ouml;glich ist, die Kriterien f&uuml;r die Festlegung dieser Dauer</li>\n\t\t<li>das Bestehen eines Rechts auf Berichtigung oder L&ouml;schung der sie betreffenden personenbezogenen Daten oder auf Einschr&auml;nkung der Verarbeitung durch den Verantwortlichen oder eines Widerspruchsrechts gegen diese Verarbeitung</li>\n\t\t<li>das Bestehen eines Beschwerderechts bei einer Aufsichtsbeh&ouml;rde</li>\n\t\t<li>wenn die personenbezogenen Daten nicht bei der betroffenen Person erhoben werden: Alle verf&uuml;gbaren Informationen &uuml;ber die Herkunft der Daten</li>\n\t\t<li>das Bestehen einer automatisierten Entscheidungsfindung einschlie&szlig;lich Profiling gem&auml;&szlig; Artikel 22 Abs.1 und 4 DS-GVO und &mdash; zumindest in diesen F&auml;llen &mdash; aussagekr&auml;ftige Informationen &uuml;ber die involvierte Logik sowie die Tragweite und die angestrebten Auswirkungen einer derartigen Verarbeitung f&uuml;r die betroffene Person</li>\n\t</ul>\n\n\t<p>Ferner steht der betroffenen Person ein Auskunftsrecht dar&uuml;ber zu, ob personenbezogene Daten an ein Drittland oder an eine internationale Organisation &uuml;bermittelt wurden. Sofern dies der Fall ist, so steht der betroffenen Person im &Uuml;brigen das Recht zu, Auskunft &uuml;ber die geeigneten Garantien im Zusammenhang mit der &Uuml;bermittlung zu erhalten.</p>\n\n\t<p>M&ouml;chte eine betroffene Person dieses Auskunftsrecht in Anspruch nehmen, kann sie sich hierzu jederzeit an einen Mitarbeiter des f&uuml;r die Verarbeitung Verantwortlichen wenden.</p>\n\t</li>\n\t<li>\n\t<h3>c)&nbsp;&nbsp;&nbsp; Recht auf Berichtigung</h3>\n\n\t<p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ&auml;ischen Richtlinien- und Verordnungsgeber gew&auml;hrte Recht, die unverz&uuml;gliche Berichtigung sie betreffender unrichtiger personenbezogener Daten zu verlangen. Ferner steht der betroffenen Person das Recht zu, unter Ber&uuml;cksichtigung der Zwecke der Verarbeitung, die Vervollst&auml;ndigung unvollst&auml;ndiger personenbezogener Daten &mdash; auch mittels einer erg&auml;nzenden Erkl&auml;rung &mdash; zu verlangen.</p>\n\n\t<p>M&ouml;chte eine betroffene Person dieses Berichtigungsrecht in Anspruch nehmen, kann sie sich hierzu jederzeit an einen Mitarbeiter des f&uuml;r die Verarbeitung Verantwortlichen wenden.</p>\n\t</li>\n\t<li>\n\t<h3>d)&nbsp;&nbsp;&nbsp; Recht auf L&ouml;schung (Recht auf Vergessen werden)</h3>\n\n\t<p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ&auml;ischen Richtlinien- und Verordnungsgeber gew&auml;hrte Recht, von dem Verantwortlichen zu verlangen, dass die sie betreffenden personenbezogenen Daten unverz&uuml;glich gel&ouml;scht werden, sofern einer der folgenden Gr&uuml;nde zutrifft und soweit die Verarbeitung nicht erforderlich ist:</p>\n\n\t<ul>\n\t\t<li>Die personenbezogenen Daten wurden f&uuml;r solche Zwecke erhoben oder auf sonstige Weise verarbeitet, f&uuml;r welche sie nicht mehr notwendig sind.</li>\n\t\t<li>Die betroffene Person widerruft ihre Einwilligung, auf die sich die Verarbeitung gem&auml;&szlig; Art. 6 Abs. 1 Buchstabe a DS-GVO oder Art. 9 Abs. 2 Buchstabe a DS-GVO st&uuml;tzte, und es fehlt an einer anderweitigen Rechtsgrundlage f&uuml;r die Verarbeitung.</li>\n\t\t<li>Die betroffene Person legt gem&auml;&szlig; Art. 21 Abs. 1 DS-GVO Widerspruch gegen die Verarbeitung ein, und es liegen keine vorrangigen berechtigten Gr&uuml;nde f&uuml;r die Verarbeitung vor, oder die betroffene Person legt gem&auml;&szlig; Art. 21 Abs. 2 DS-GVO Widerspruch gegen die Verarbeitung ein.</li>\n\t\t<li>Die personenbezogenen Daten wurden unrechtm&auml;&szlig;ig verarbeitet.</li>\n\t\t<li>Die L&ouml;schung der personenbezogenen Daten ist zur Erf&uuml;llung einer rechtlichen Verpflichtung nach dem Unionsrecht oder dem Recht der Mitgliedstaaten erforderlich, dem der Verantwortliche unterliegt.</li>\n\t\t<li>Die personenbezogenen Daten wurden in Bezug auf angebotene Dienste der Informationsgesellschaft gem&auml;&szlig; Art. 8 Abs. 1 DS-GVO erhoben.</li>\n\t</ul>\n\n\t<p>Sofern einer der oben genannten Gr&uuml;nde zutrifft und eine betroffene Person die L&ouml;schung von personenbezogenen Daten, die bei der Firmenname gespeichert sind, veranlassen m&ouml;chte, kann sie sich hierzu jederzeit an einen Mitarbeiter des f&uuml;r die Verarbeitung Verantwortlichen wenden. Der Mitarbeiter der Firmenname wird veranlassen, dass dem L&ouml;schverlangen unverz&uuml;glich nachgekommen wird.</p>\n\n\t<p>Wurden die personenbezogenen Daten von der Firmenname &ouml;ffentlich gemacht und ist unser Unternehmen als Verantwortlicher gem&auml;&szlig; Art. 17 Abs. 1 DS-GVO zur L&ouml;schung der personenbezogenen Daten verpflichtet, so trifft die Firmenname unter Ber&uuml;cksichtigung der verf&uuml;gbaren Technologie und der Implementierungskosten angemessene Ma&szlig;nahmen, auch technischer Art, um andere f&uuml;r die Datenverarbeitung Verantwortliche, welche die ver&ouml;ffentlichten personenbezogenen Daten verarbeiten, dar&uuml;ber in Kenntnis zu setzen, dass die betroffene Person von diesen anderen f&uuml;r die Datenverarbeitung Verantwortlichen die L&ouml;schung s&auml;mtlicher Links zu diesen personenbezogenen Daten oder von Kopien oder Replikationen dieser personenbezogenen Daten verlangt hat, soweit die Verarbeitung nicht erforderlich ist. Der Mitarbeiter der Firmenname wird im Einzelfall das Notwendige veranlassen.</p>\n\t</li>\n\t<li>\n\t<h3>e)&nbsp;&nbsp;&nbsp; Recht auf Einschr&auml;nkung der Verarbeitung</h3>\n\n\t<p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ&auml;ischen Richtlinien- und Verordnungsgeber gew&auml;hrte Recht, von dem Verantwortlichen die Einschr&auml;nkung der Verarbeitung zu verlangen, wenn eine der folgenden Voraussetzungen gegeben ist:</p>\n\n\t<ul>\n\t\t<li>Die Richtigkeit der personenbezogenen Daten wird von der betroffenen Person bestritten, und zwar f&uuml;r eine Dauer, die es dem Verantwortlichen erm&ouml;glicht, die Richtigkeit der personenbezogenen Daten zu &uuml;berpr&uuml;fen.</li>\n\t\t<li>Die Verarbeitung ist unrechtm&auml;&szlig;ig, die betroffene Person lehnt die L&ouml;schung der personenbezogenen Daten ab und verlangt stattdessen die Einschr&auml;nkung der Nutzung der personenbezogenen Daten.</li>\n\t\t<li>Der Verantwortliche ben&ouml;tigt die personenbezogenen Daten f&uuml;r die Zwecke der Verarbeitung nicht l&auml;nger, die betroffene Person ben&ouml;tigt sie jedoch zur Geltendmachung, Aus&uuml;bung oder Verteidigung von Rechtsanspr&uuml;chen.</li>\n\t\t<li>Die betroffene Person hat Widerspruch gegen die Verarbeitung gem. Art. 21 Abs. 1 DS-GVO eingelegt und es steht noch nicht fest, ob die berechtigten Gr&uuml;nde des Verantwortlichen gegen&uuml;ber denen der betroffenen Person &uuml;berwiegen.</li>\n\t</ul>\n\n\t<p>Sofern eine der oben genannten Voraussetzungen gegeben ist und eine betroffene Person die Einschr&auml;nkung von personenbezogenen Daten, die bei der Firmenname gespeichert sind, verlangen m&ouml;chte, kann sie sich hierzu jederzeit an einen Mitarbeiter des f&uuml;r die Verarbeitung Verantwortlichen wenden. Der Mitarbeiter der Firmenname wird die Einschr&auml;nkung der Verarbeitung veranlassen.</p>\n\t</li>\n\t<li>\n\t<h3>f)&nbsp;&nbsp;&nbsp;&nbsp; Recht auf Daten&uuml;bertragbarkeit</h3>\n\n\t<p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ&auml;ischen Richtlinien- und Verordnungsgeber gew&auml;hrte Recht, die sie betreffenden personenbezogenen Daten, welche durch die betroffene Person einem Verantwortlichen bereitgestellt wurden, in einem strukturierten, g&auml;ngigen und maschinenlesbaren Format zu erhalten. Sie hat au&szlig;erdem das Recht, diese Daten einem anderen Verantwortlichen ohne Behinderung durch den Verantwortlichen, dem die personenbezogenen Daten bereitgestellt wurden, zu &uuml;bermitteln, sofern die Verarbeitung auf der Einwilligung gem&auml;&szlig; Art. 6 Abs. 1 Buchstabe a DS-GVO oder Art. 9 Abs. 2 Buchstabe a DS-GVO oder auf einem Vertrag gem&auml;&szlig; Art. 6 Abs. 1 Buchstabe b DS-GVO beruht und die Verarbeitung mithilfe automatisierter Verfahren erfolgt, sofern die Verarbeitung nicht f&uuml;r die Wahrnehmung einer Aufgabe erforderlich ist, die im &ouml;ffentlichen Interesse liegt oder in Aus&uuml;bung &ouml;ffentlicher Gewalt erfolgt, welche dem Verantwortlichen &uuml;bertragen wurde.</p>\n\n\t<p>Ferner hat die betroffene Person bei der Aus&uuml;bung ihres Rechts auf Daten&uuml;bertragbarkeit gem&auml;&szlig; Art. 20 Abs. 1 DS-GVO das Recht, zu erwirken, dass die personenbezogenen Daten direkt von einem Verantwortlichen an einen anderen Verantwortlichen &uuml;bermittelt werden, soweit dies technisch machbar ist und sofern hiervon nicht die Rechte und Freiheiten anderer Personen beeintr&auml;chtigt werden.</p>\n\n\t<p>Zur Geltendmachung des Rechts auf Daten&uuml;bertragbarkeit kann sich die betroffene Person jederzeit an einen Mitarbeiter der Firmenname wenden.</p>\n\t</li>\n\t<li>\n\t<h3>g)&nbsp;&nbsp;&nbsp; Recht auf Widerspruch</h3>\n\n\t<p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ&auml;ischen Richtlinien- und Verordnungsgeber gew&auml;hrte Recht, aus Gr&uuml;nden, die sich aus ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung sie betreffender personenbezogener Daten, die aufgrund von Art. 6 Abs. 1 Buchstaben e oder f DS-GVO erfolgt, Widerspruch einzulegen. Dies gilt auch f&uuml;r ein auf diese Bestimmungen gest&uuml;tztes Profiling.</p>\n\n\t<p>Die Firmenname verarbeitet die personenbezogenen Daten im Falle des Widerspruchs nicht mehr, es sei denn, wir k&ouml;nnen zwingende schutzw&uuml;rdige Gr&uuml;nde f&uuml;r die Verarbeitung nachweisen, die den Interessen, Rechten und Freiheiten der betroffenen Person &uuml;berwiegen, oder die Verarbeitung dient der Geltendmachung, Aus&uuml;bung oder Verteidigung von Rechtsanspr&uuml;chen.</p>\n\n\t<p>Verarbeitet die Firmenname personenbezogene Daten, um Direktwerbung zu betreiben, so hat die betroffene Person das Recht, jederzeit Widerspruch gegen die Verarbeitung der personenbezogenen Daten zum Zwecke derartiger Werbung einzulegen. Dies gilt auch f&uuml;r das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht. Widerspricht die betroffene Person gegen&uuml;ber der Firmenname der Verarbeitung f&uuml;r Zwecke der Direktwerbung, so wird die Firmenname die personenbezogenen Daten nicht mehr f&uuml;r diese Zwecke verarbeiten.</p>\n\n\t<p>Zudem hat die betroffene Person das Recht, aus Gr&uuml;nden, die sich aus ihrer besonderen Situation ergeben, gegen die sie betreffende Verarbeitung personenbezogener Daten, die bei der Firmenname zu wissenschaftlichen oder historischen Forschungszwecken oder zu statistischen Zwecken gem&auml;&szlig; Art. 89 Abs. 1 DS-GVO erfolgen, Widerspruch einzulegen, es sei denn, eine solche Verarbeitung ist zur Erf&uuml;llung einer im &ouml;ffentlichen Interesse liegenden Aufgabe erforderlich.</p>\n\n\t<p>Zur Aus&uuml;bung des Rechts auf Widerspruch kann sich die betroffene Person direkt jeden Mitarbeiter der Firmenname oder einen anderen Mitarbeiter wenden. Der betroffenen Person steht es ferner frei, im Zusammenhang mit der Nutzung von Diensten der Informationsgesellschaft, ungeachtet der Richtlinie 2002/58/EG, ihr Widerspruchsrecht mittels automatisierter Verfahren auszu&uuml;ben, bei denen technische Spezifikationen verwendet werden.</p>\n\t</li>\n\t<li>\n\t<h3>h)&nbsp;&nbsp;&nbsp; Automatisierte Entscheidungen im Einzelfall einschlie&szlig;lich Profiling</h3>\n\n\t<p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ&auml;ischen Richtlinien- und Verordnungsgeber gew&auml;hrte Recht, nicht einer ausschlie&szlig;lich auf einer automatisierten Verarbeitung &mdash; einschlie&szlig;lich Profiling &mdash; beruhenden Entscheidung unterworfen zu werden, die ihr gegen&uuml;ber rechtliche Wirkung entfaltet oder sie in &auml;hnlicher Weise erheblich beeintr&auml;chtigt, sofern die Entscheidung (1) nicht f&uuml;r den Abschluss oder die Erf&uuml;llung eines Vertrags zwischen der betroffenen Person und dem Verantwortlichen erforderlich ist, oder (2) aufgrund von Rechtsvorschriften der Union oder der Mitgliedstaaten, denen der Verantwortliche unterliegt, zul&auml;ssig ist und diese Rechtsvorschriften angemessene Ma&szlig;nahmen zur Wahrung der Rechte und Freiheiten sowie der berechtigten Interessen der betroffenen Person enthalten oder (3) mit ausdr&uuml;cklicher Einwilligung der betroffenen Person erfolgt.</p>\n\n\t<p>Ist die Entscheidung (1) f&uuml;r den Abschluss oder die Erf&uuml;llung eines Vertrags zwischen der betroffenen Person und dem Verantwortlichen erforderlich oder (2) erfolgt sie mit ausdr&uuml;cklicher Einwilligung der betroffenen Person, trifft die Firmenname angemessene Ma&szlig;nahmen, um die Rechte und Freiheiten sowie die berechtigten Interessen der betroffenen Person zu wahren, wozu mindestens das Recht auf Erwirkung des Eingreifens einer Person seitens des Verantwortlichen, auf Darlegung des eigenen Standpunkts und auf Anfechtung der Entscheidung geh&ouml;rt.</p>\n\n\t<p>M&ouml;chte die betroffene Person Rechte mit Bezug auf automatisierte Entscheidungen geltend machen, kann sie sich hierzu jederzeit an einen Mitarbeiter des f&uuml;r die Verarbeitung Verantwortlichen wenden.</p>\n\t</li>\n\t<li>\n\t<h3>i)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Recht auf Widerruf einer datenschutzrechtlichen Einwilligung</h3>\n\n\t<p>Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ&auml;ischen Richtlinien- und Verordnungsgeber gew&auml;hrte Recht, eine Einwilligung zur Verarbeitung personenbezogener Daten jederzeit zu widerrufen.</p>\n\n\t<p>M&ouml;chte die betroffene Person ihr Recht auf Widerruf einer Einwilligung geltend machen, kann sie sich hierzu jederzeit an einen Mitarbeiter des f&uuml;r die Verarbeitung Verantwortlichen wenden.</p>\n\t</li>\n</ul>\n\n<h2>7. Datenschutzbestimmungen zu Einsatz und Verwendung von affilinet</h2>\n\n<p>Der f&uuml;r die Verarbeitung Verantwortliche hat auf dieser Internetseite Komponenten des Unternehmens affilinet integriert. Affilinet ist ein deutsches Affiliate-Netzwerk, welches Affiliate-Marketing anbietet.</p>\n\n<p>Affiliate-Marketing ist eine Internetgest&uuml;tzte Vertriebsform, die es kommerziellen Betreibern von Internetseiten, den sogenannten Merchants oder Advertisern, erm&ouml;glicht, Werbung, die meist &uuml;ber Klick- oder Sale-Provisionen verg&uuml;tet wird, auf Internetseiten Dritter, also bei Vertriebspartnern, die auch Affiliates oder Publisher genannt werden, einzublenden. Der Merchant stellt &uuml;ber das Affiliate-Netzwerk ein Werbemittel, also einen Werbebanner oder andere geeignete Mittel der Internetwerbung, zur Verf&uuml;gung, welche in der Folge von einem Affiliate auf eigenen Internetseiten eingebunden oder &uuml;ber sonstige Kan&auml;le, wie etwa das Keyword-Advertising oder E-Mail-Marketing, beworben werden.</p>\n\n<p>Betreibergesellschaft von Affilinet ist die affilinet GmbH, Sapporobogen 6-8, 80637 M&uuml;nchen, Deutschland.</p>\n\n<p>Affilinet setzt ein Cookie auf dem informationstechnologischen System der betroffenen Person. Was Cookies sind, wurde oben bereits erl&auml;utert. Das Tracking-Cookie von Affilinet speichert keinerlei personenbezogene Daten. Gespeichert werden lediglich die Identifikationsnummer des Affiliate, also des den potentiellen Kunden vermittelnden Partners, sowie die Ordnungsnummer des Besuchers einer Internetseite und des angeklickten Werbemittels. Zweck der Speicherung dieser Daten ist die Abwicklung von Provisionszahlungen zwischen einem Merchant und dem Affiliate, welche &uuml;ber das Affiliate-Netzwerk, also Affilinet, abgewickelt werden.</p>\n\n<p>Die betroffene Person kann die Setzung von Cookies durch unsere Internetseite, wie oben bereits dargestellt, jederzeit mittels einer entsprechenden Einstellung des genutzten Internetbrowsers verhindern und damit der Setzung von Cookies dauerhaft widersprechen. Eine solche Einstellung des genutzten Internetbrowsers w&uuml;rde auch verhindern, dass Affilinet ein Cookie auf dem informationstechnologischen System der betroffenen Person setzt. Zudem k&ouml;nnen von Affilinet bereits gesetzte Cookies jederzeit &uuml;ber einen Internetbrowser oder andere Softwareprogramme gel&ouml;scht werden.</p>\n\n<p>Die geltenden Datenschutzbestimmungen von Affilinet k&ouml;nnen unter https://www.affili.net/de/footeritem/datenschutz abgerufen werden.</p>\n\n<h2>8. Datenschutzbestimmungen zu Einsatz und Verwendung von Funktionen des Amazon-Partnerprogramms</h2>\n\n<p>Der f&uuml;r die Verarbeitung Verantwortliche hat als Teilnehmer des Amazon-Partnerprogramms auf dieser Internetseite Amazon-Komponenten integriert. Die Amazon-Komponenten wurden von Amazon mit dem Ziel konzipiert, Kunden &uuml;ber Werbeanzeigen auf unterschiedliche Internetseiten der Amazon-Gruppe, insbesondere auf Amazon.co.uk, Local.Amazon.co.uk, Amazon.de, BuyVIP.com, Amazon.fr, Amazon.it und Amazon.es. BuyVIP.com gegen Zahlung einer Provision zu vermitteln. Der f&uuml;r die Verarbeitung Verantwortliche kann durch die Nutzung der Amazon-Komponenten Werbeeinnahmen generieren.</p>\n\n<p>Betreibergesellschaft dieser Amazon-Komponenten ist die Amazon EU S.&agrave;.r.l, 5 Rue Plaetis, L-2338 Luxembourg, Luxemburg.</p>\n\n<p>Amazon setzt ein Cookie auf dem informationstechnologischen System der betroffenen Person. Was Cookies sind, wurde oben bereits erl&auml;utert. Durch jeden einzelnen Aufruf einer der Einzelseiten dieser Internetseite, die durch den f&uuml;r die Verarbeitung Verantwortlichen betrieben wird und auf welcher eine Amazon-Komponente integriert wurde, wird der Internetbrowser auf dem informationstechnologischen System der betroffenen Person automatisch durch die jeweilige Amazon-Komponente veranlasst, Daten zum Zwecke der Online-Werbung und der Abrechnung von Provisionen an Amazon zu &uuml;bermitteln. Im Rahmen dieses technischen Verfahrens erh&auml;lt Amazon Kenntnis &uuml;ber personenbezogene Daten, die Amazon dazu dienen, die Herkunft von bei Amazon eingehenden Bestellungen nachzuvollziehen und in der Folge eine Provisionsabrechnung zu erm&ouml;glichen. Amazon kann unter anderem nachvollziehen, dass die betroffene Person einen Partnerlink auf unserer Internetseite angeklickt hat.</p>\n\n<p>Die betroffene Person kann die Setzung von Cookies durch unsere Internetseite, wie oben bereits dargestellt, jederzeit mittels einer entsprechenden Einstellung des genutzten Internetbrowsers verhindern und damit der Setzung von Cookies dauerhaft widersprechen. Eine solche Einstellung des genutzten Internetbrowsers w&uuml;rde auch verhindern, dass Amazon ein Cookie auf dem informationstechnologischen System der betroffenen Person setzt. Zudem k&ouml;nnen von Amazon bereits gesetzte Cookies jederzeit &uuml;ber einen Internetbrowser oder andere Softwareprogramme gel&ouml;scht werden.</p>\n\n<p>Weitere Informationen und die geltenden Datenschutzbestimmungen von Amazon k&ouml;nnen unter https://www.amazon.de/gp/help/customer/display.html?nodeId=3312401 abgerufen werden.</p>\n\n<h2>9. Datenschutzbestimmungen zu Einsatz und Verwendung von Bloglovin</h2>\n\n<p>Der f&uuml;r die Verarbeitung Verantwortliche hat auf dieser Internetseite Komponenten von Bloglovin integriert. Bloglovin ist eine Online-Plattform, welche den Nutzern die Organisation ihrer Lieblingsblogs erm&ouml;glicht. Ein Blog ist ein auf einer Internetseite gef&uuml;hrtes, in der Regel &ouml;ffentlich einsehbares Portal, in welchem eine oder mehrere Personen, die Blogger oder Weblogger genannt werden, Artikel posten oder Gedanken in sogenannten Blogposts niederschreiben k&ouml;nnen.</p>\n\n<p>Betreibergesellschaft von Bloglovin ist die Bloglovin Inc., 25 Broadway, New York, NY 10004, USA.</p>\n\n<p>Durch jeden Aufruf einer der Einzelseiten dieser Internetseite, die durch den f&uuml;r die Verarbeitung Verantwortlichen betrieben wird und auf welcher eine Bloglovin-Komponente integriert wurde, wird der Internetbrowser auf dem informationstechnologischen System der betroffenen Person automatisch durch die jeweilige Bloglovin-Komponente veranlasst, eine Darstellung der entsprechenden Bloglovin-Komponente von Bloglovin herunterzuladen. Im Rahmen dieses technischen Verfahrens erh&auml;lt Bloglovin Kenntnis dar&uuml;ber, welche konkrete Unterseite unserer Internetseite durch die betroffene Person besucht wird.</p>\n\n<p>Sofern die betroffene Person gleichzeitig bei Bloglovin eingeloggt ist, erkennt Bloglovin mit jedem Aufruf unserer Internetseite durch die betroffene Person und w&auml;hrend der gesamten Dauer des jeweiligen Aufenthaltes auf unserer Internetseite, welche konkrete Unterseite unserer Internetseite die betroffene Person besucht. Diese Informationen werden durch die Bloglovin-Komponente gesammelt und durch Bloglovin dem jeweiligen Bloglovin-Account der betroffenen Person zugeordnet. Bet&auml;tigt die betroffene Person den auf unserer Internetseite integrierten Bloglovin-Button, so wird diese Information an Bloglovin &uuml;bermittelt. Der &Uuml;bermittlung derartiger Informationen hat die betroffene Person gegen&uuml;ber Bloglovin bereits zugestimmt.</p>\n\n<p>Weitere Informationen und die geltenden Datenschutzbestimmungen von Bloglovin k&ouml;nnen unter https://www.bloglovin.com/tos abgerufen werden.</p>\n\n<h2>10. Rechtsgrundlage der Verarbeitung</h2>\n\n<p>Art. 6 I lit. a DS-GVO dient unserem Unternehmen als Rechtsgrundlage f&uuml;r Verarbeitungsvorg&auml;nge, bei denen wir eine Einwilligung f&uuml;r einen bestimmten Verarbeitungszweck einholen. Ist die Verarbeitung personenbezogener Daten zur Erf&uuml;llung eines Vertrags, dessen Vertragspartei die betroffene Person ist, erforderlich, wie dies beispielsweise bei Verarbeitungsvorg&auml;ngen der Fall ist, die f&uuml;r eine Lieferung von Waren oder die Erbringung einer sonstigen Leistung oder Gegenleistung notwendig sind, so beruht die Verarbeitung auf Art. 6 I lit. b DS-GVO. Gleiches gilt f&uuml;r solche Verarbeitungsvorg&auml;nge die zur Durchf&uuml;hrung vorvertraglicher Ma&szlig;nahmen erforderlich sind, etwa in F&auml;llen von Anfragen zur unseren Produkten oder Leistungen. Unterliegt unser Unternehmen einer rechtlichen Verpflichtung durch welche eine Verarbeitung von personenbezogenen Daten erforderlich wird, wie beispielsweise zur Erf&uuml;llung steuerlicher Pflichten, so basiert die Verarbeitung auf Art. 6 I lit. c DS-GVO. In seltenen F&auml;llen k&ouml;nnte die Verarbeitung von personenbezogenen Daten erforderlich werden, um lebenswichtige Interessen der betroffenen Person oder einer anderen nat&uuml;rlichen Person zu sch&uuml;tzen. Dies w&auml;re beispielsweise der Fall, wenn ein Besucher in unserem Betrieb verletzt werden w&uuml;rde und daraufhin sein Name, sein Alter, seine Krankenkassendaten oder sonstige lebenswichtige Informationen an einen Arzt, ein Krankenhaus oder sonstige Dritte weitergegeben werden m&uuml;ssten. Dann w&uuml;rde die Verarbeitung auf Art. 6 I lit. d DS-GVO beruhen. Letztlich k&ouml;nnten Verarbeitungsvorg&auml;nge auf Art. 6 I lit. f DS-GVO beruhen. Auf dieser Rechtsgrundlage basieren Verarbeitungsvorg&auml;nge, die von keiner der vorgenannten Rechtsgrundlagen erfasst werden, wenn die Verarbeitung zur Wahrung eines berechtigten Interesses unseres Unternehmens oder eines Dritten erforderlich ist, sofern die Interessen, Grundrechte und Grundfreiheiten des Betroffenen nicht &uuml;berwiegen. Solche Verarbeitungsvorg&auml;nge sind uns insbesondere deshalb gestattet, weil sie durch den Europ&auml;ischen Gesetzgeber besonders erw&auml;hnt wurden. Er vertrat insoweit die Auffassung, dass ein berechtigtes Interesse anzunehmen sein k&ouml;nnte, wenn die betroffene Person ein Kunde des Verantwortlichen ist (Erw&auml;gungsgrund 47 Satz 2 DS-GVO).</p>\n\n<h2>11. Berechtigte Interessen an der Verarbeitung, die von dem Verantwortlichen oder einem Dritten verfolgt werden</h2>\n\n<p>Basiert die Verarbeitung personenbezogener Daten auf Artikel 6 I lit. f DS-GVO ist unser berechtigtes Interesse die Durchf&uuml;hrung unserer Gesch&auml;ftst&auml;tigkeit zugunsten des Wohlergehens all unserer Mitarbeiter und unserer Anteilseigner.</p>\n\n<h2>12. Dauer, f&uuml;r die die personenbezogenen Daten gespeichert werden</h2>\n\n<p>Das Kriterium f&uuml;r die Dauer der Speicherung von personenbezogenen Daten ist die jeweilige gesetzliche Aufbewahrungsfrist. Nach Ablauf der Frist werden die entsprechenden Daten routinem&auml;&szlig;ig gel&ouml;scht, sofern sie nicht mehr zur Vertragserf&uuml;llung oder Vertragsanbahnung erforderlich sind.</p>\n\n<h2>13. Gesetzliche oder vertragliche Vorschriften zur Bereitstellung der personenbezogenen Daten; Erforderlichkeit f&uuml;r den Vertragsabschluss; Verpflichtung der betroffenen Person, die personenbezogenen Daten bereitzustellen; m&ouml;gliche Folgen der Nichtbereitstellung</h2>\n\n<p>Wir kl&auml;ren Sie dar&uuml;ber auf, dass die Bereitstellung personenbezogener Daten zum Teil gesetzlich vorgeschrieben ist (z.B. Steuervorschriften) oder sich auch aus vertraglichen Regelungen (z.B. Angaben zum Vertragspartner) ergeben kann. Mitunter kann es zu einem Vertragsschluss erforderlich sein, dass eine betroffene Person uns personenbezogene Daten zur Verf&uuml;gung stellt, die in der Folge durch uns verarbeitet werden m&uuml;ssen. Die betroffene Person ist beispielsweise verpflichtet uns personenbezogene Daten bereitzustellen, wenn unser Unternehmen mit ihr einen Vertrag abschlie&szlig;t. Eine Nichtbereitstellung der personenbezogenen Daten h&auml;tte zur Folge, dass der Vertrag mit dem Betroffenen nicht geschlossen werden k&ouml;nnte. Vor einer Bereitstellung personenbezogener Daten durch den Betroffenen muss sich der Betroffene an einen unserer Mitarbeiter wenden. Unser Mitarbeiter kl&auml;rt den Betroffenen einzelfallbezogen dar&uuml;ber auf, ob die Bereitstellung der personenbezogenen Daten gesetzlich oder vertraglich vorgeschrieben oder f&uuml;r den Vertragsabschluss erforderlich ist, ob eine Verpflichtung besteht, die personenbezogenen Daten bereitzustellen, und welche Folgen die Nichtbereitstellung der personenbezogenen Daten h&auml;tte.</p>\n\n<h2>14. Bestehen einer automatisierten Entscheidungsfindung</h2>\n\n<p>Als verantwortungsbewusstes Unternehmen verzichten wir auf eine automatische Entscheidungsfindung oder ein Profiling.</p>\n\n<p>Diese Datenschutzerkl&auml;rung wurde durch den Datenschutzerkl&auml;rungs-Generator der DGD Deutsche Gesellschaft f&uuml;r Datenschutz GmbH, die als&nbsp;<a href="https://dg-datenschutz.de/datenschutz-dienstleistungen/externer-datenschutzbeauftragter/" rel="nofollow">Datenschutzbeauftragter</a>&nbsp;t&auml;tig ist, in Kooperation mit den&nbsp;<a href="https://www.wbs-law.de/it-recht/datenschutzrecht" rel="nofollow">Datenschutz Anw&auml;lten der Kanzlei WILDE BEUGER SOLMECKE | Rechtsanw&auml;lte</a>erstellt.</p>\n'
          }
        },
        firstcategory: {
          'en-US': {
            '1546177486327': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T13:44:46.327Z'
              },
              active: true,
              id: 1546177486327,
              name: 'Schmuk',
              secondCategory: [1546173810837, 1546173822320, 1546173833280]
            },
            '1546177507532': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T13:45:07.532Z'
              },
              active: true,
              id: 1546177507532,
              name: 'Dekoration',
              secondCategory: [1546173843645, 1546173856224, 1546174117923]
            },
            '1546177546300': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T13:45:46.300Z'
              },
              active: true,
              id: 1546177546300,
              name: 'Essen & Trinken',
              secondCategory: [
                1546174141320,
                1546174129882,
                1546174160649,
                1546174181253,
                1546174192860,
                1546174149180
              ]
            },
            '1546177598222': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T13:46:38.222Z'
              },
              active: true,
              id: 1546177598222,
              name: 'Elektrogeräte',
              secondCategory: [
                1546174045067,
                1546174059533,
                1546174088366,
                1546174076211
              ]
            }
          }
        },
        occasion: {
          'en-US': {
            '1527698389950': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-05-30T16:39:49.951Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2018-07-15T09:04:14.366Z'
              },
              activation: true,
              date: '2018-12-24T12:00:00+01:00',
              id: 1527698389950,
              name: 'Weihnachten',
              picture: [1531563247073],
              position: 1
            },
            '1527699643348': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-05-30T17:00:43.348Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2018-07-15T09:04:20.650Z'
              },
              activation: true,
              date: '2018-06-26T19:34:59+02:00',
              id: 1527699643348,
              name: 'Ostern',
              picture: [1531563204262],
              position: 6
            },
            '1530034930355': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-06-26T17:42:10.355Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2018-07-14T10:21:54.746Z'
              },
              activation: true,
              date: '2018-06-26T20:07:22+02:00',
              id: 1530034930355,
              name: 'Beziehung',
              picture: [1531563092357],
              position: 2
            },
            '1530034952544': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-06-26T17:42:32.544Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2018-07-15T09:04:28.170Z'
              },
              activation: true,
              date: '2018-06-26T20:07:35+02:00',
              id: 1530034952544,
              name: 'Für die Frau',
              picture: [1531563101325],
              position: 3
            },
            '1530035000315': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-06-26T17:43:20.315Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2018-07-15T09:04:37.965Z'
              },
              activation: true,
              date: '2018-06-26T19:43:20+02:00',
              id: 1530035000315,
              name: 'Für echte Männer',
              picture: [1531563114467],
              position: 4
            },
            '1530035166137': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-06-26T17:46:06.137Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2018-07-15T09:04:46.393Z'
              },
              activation: true,
              date: '2018-06-26T20:07:55+02:00',
              id: 1530035166137,
              name: 'Geburtstag',
              picture: [1531563126373],
              position: 5
            },
            '1530035198081': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-06-26T17:46:38.081Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2018-07-15T09:05:04.345Z'
              },
              activation: true,
              date: '2018-06-26T20:08:05+02:00',
              id: 1530035198081,
              name: 'Hochzeit',
              picture: [1531563142990],
              position: 7
            },
            '1530035255083': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-06-26T17:47:35.083Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2018-07-15T09:04:54.904Z'
              },
              activation: true,
              date: '2019-05-12T12:00:00+02:00',
              id: 1530035255083,
              name: 'Muttertag',
              picture: [1531563188306],
              position: 8
            },
            '1530035298101': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-06-26T17:48:18.101Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2018-07-15T09:05:15.257Z'
              },
              activation: true,
              date: '2019-05-30T12:00:00+02:00',
              id: 1530035298101,
              name: 'Vatertag',
              picture: [1531563236482],
              position: 9
            },
            '1530035316798': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-06-26T17:48:36.798Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2018-07-15T09:05:24.656Z'
              },
              activation: true,
              date: '2018-06-27T18:08:49+02:00',
              id: 1530035316798,
              name: 'Romatisch',
              picture: [1531563213573],
              position: 10
            },
            '1530035380609': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-06-26T17:49:40.610Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2019-01-15T20:06:09.870Z'
              },
              activation: true,
              date: '2019-02-14T12:00:00+01:00',
              id: 1530035380609,
              name: 'Valentinstag',
              picture: [1531563226779],
              position: 1
            }
          }
        },
        products: {
          'en-US': {
            '1542623529262': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-11-19T10:32:09.262Z',
                lastModifiedBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                lastModifiedDate: '2019-02-22T20:15:01.728Z'
              },
              affiliateLink: 'https://amzn.to/2PAo3rY',
              api: 'amazon',
              apiId: 'B0798M92JC',
              company: '',
              description: '',
              firstCategory: 1546177507532,
              gender: 'female',
              group: 'Guild Product',
              id: '1542623529262',
              metaData: {
                lastUpdate: 1548098791501,
                linkVisits: '',
                protokoll:
                  'Update Produkt from Amazon API Date: Mon Jan 21 2019',
                updateError: false,
                visits: 0
              },
              name: 'Lichtschale',
              occasion: [1527698389950],
              offerListingId:
                '8emVxySi0XnrGGtlUof%2FMMmJXR4A333TUnam2gKNNP4q7tMpI6XRvJJczpwTALMrShD2tdbZCceH%2FyCIZLwifyR4HVVo345nLiOHu3%2F0Jz3f5FXAsvBUISOtkdMzg8y1hs4H9nMkcU4m%2F472c9CRgFy4Vm7KpsU7',
              originalLink:
                'https://www.amazon.de/Lichtschale-gold-Geburtstagsgeschenk-Muttertagsgeschenk-Geschenkidee/dp/B0798M92JC?SubscriptionId=AKIAJ6WE2DNROWEZVCYA&tag=dreampresen0c-21&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B0798M92JC',
              originalShop: 'www.amazon.de',
              originalTitle:
                'Lichtschale gold - S (15cm) - Beton schwarz/grau | Unikat handmade | Geburtstagsgeschenk | Gartendeko| Muttertagsgeschenk | Geschenkidee | Geschenk für die Frau',
              pictureLinks: [
                {
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/316GPexV9EL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/316GPexV9EL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/316GPexV9EL._SL75_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91vMxEuNSmL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51fs5PTGHAL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51fs5PTGHAL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51fs5PTGHAL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/713LSKM4H7L.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41Fz9dymyRL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41Fz9dymyRL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41Fz9dymyRL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91f%2Bcs2njpL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51esVNhgIzL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51esVNhgIzL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51esVNhgIzL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/81hU1MT1EUL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41fx3t1gefL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41fx3t1gefL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41fx3t1gefL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71wQER2kdxL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/316GPexV9EL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/316GPexV9EL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/316GPexV9EL._SL110_.jpg'
                }
              ],
              price: '2995',
              secondCategory: 1546174117923
            },
            '1542623747232': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-11-19T10:35:47.232Z',
                lastModifiedBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
                lastModifiedDate: '2019-02-22T20:15:50.383Z'
              },
              affiliateLink: 'https://amzn.to/2DKJU9T',
              api: 'amazon',
              apiId: 'B01MXNO79T',
              company: '',
              description: '',
              firstCategory: 1546177507532,
              gender: 'unisex',
              group: 'Guild Product',
              id: '1542623747232',
              metaData: {
                lastUpdate: 1548098791501,
                linkVisits: '',
                protokoll:
                  'Update Produkt from Amazon API Date: Mon Jan 21 2019',
                updateError: false,
                visits: 0
              },
              name: 'Tischlicht Weihnachten Elch Rot ',
              occasion: [1527698389950],
              offerListingId:
                '8emVxySi0XnXH8u6c6cWdNwXmclGJURe%2BXEwJGFzX6vnhstcZlYqPeo5SAsDcPlQZAMjyzddUqyrjJjO4lGxnNnWkCxOTBWTFmWJ1cieXyphFkFERAix5dU2EOaNG3hzF%2F%2BsU%2FcdGTKcnYDcLh5ojIhTC3ZvTJ0%2F',
              originalLink:
                'https://www.amazon.de/Lichth%C3%BClle-Tischlicht-Weihnachten-Weihnachtsdeko-handmade/dp/B01MXNO79T?SubscriptionId=AKIAJ6WE2DNROWEZVCYA&tag=dreampresen0c-21&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B01MXNO79T',
              originalShop: 'www.amazon.de',
              originalTitle:
                'Set 6 x Lichthülle für Tischlicht Weihnachten Elch Rot Weihnachtsdeko Advent handmade',
              pictureLinks: [
                {
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41l8HraFuZL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41l8HraFuZL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41l8HraFuZL._SL75_.jpg'
                },
                {
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41i3kj3OcJL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41i3kj3OcJL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41i3kj3OcJL._SL110_.jpg'
                },
                {
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41lgoJ-H-eL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41lgoJ-H-eL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41lgoJ-H-eL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/81AgBm-aC1L.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51Fnmc53j0L.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51Fnmc53j0L._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51Fnmc53j0L._SL110_.jpg'
                },
                {
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41l8HraFuZL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41l8HraFuZL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41l8HraFuZL._SL110_.jpg'
                }
              ],
              price: '790',
              secondCategory: 1546173856224
            },
            '1542723028898': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-11-20T14:10:28.898Z',
                lastModifiedBy: 'UNKNOWN',
                lastModifiedDate: '2019-01-21T19:26:31.525Z'
              },
              affiliateLink: 'https://amzn.to/2PDrxtG',
              api: 'amazon',
              apiId: 'B07BVNLXDW',
              company: '',
              description:
                'Tauchen Sie in die Brillanz von 4K HDR ein: Unglaubliche Kontraste, lebensrechte Farben und außerordentliches Detail in 4K.<br>4K X-Reality PRO - Jedes Detail neu durchdacht: Dank einer Bilddatenbank die Kontraste, Farben und Details überprüft, wird  jede Szene analysiert und verbessert.<br>Mit unserer Funktion zur Sprachsteuerung drücken Sie einfach nur den Mikrofon-Button und sagen Android was Sie sehen möchten.<br>Das schlanke Gehäuse, die Einfassung mit abgerundeten Ecken und der elegant gewinkelte Standfuß in warmem Silber bilden einen idealen Platz für eine Soundbar.<br>Motionflow XR - für ebenmäßige Action: Genießen Sie glatte und scharfe Details selbst in schnellen Actionszenen dank Motionflow XR Technologie.',
              firstCategory: 1539623280907,
              gender: 'unisex',
              group: 'Home Theater',
              id: '1542723028898',
              metaData: {
                lastUpdate: 1548098791501,
                linkVisits: 0,
                protokoll:
                  'Update Produkt from Amazon API Date: Mon Jan 21 2019',
                updateError: false,
                visits: 0
              },
              name: 'Samsung 55" Smart TV',
              occasion: [1527698389950, 1530035166137, 1530035000315],
              offerListingId:
                '8emVxySi0XnrGGtlUof%2FMGAlcRKLhIugWuQhKs4fmwE6W1gwZrDR%2BmMU0tbUjVW5xx%2Bi62gdkaIk01xHWs%2B4kFXR%2F60vlt6RZ4V%2BCw%2Fvefw%3D',
              originalLink:
                'https://www.amazon.de/Sony-KD-55XF7596-Fernseher-Android-Schwarz/dp/B07BVNLXDW?psc=1&SubscriptionId=AKIAJ6WE2DNROWEZVCYA&tag=dreampresen0c-21&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B07BVNLXDW',
              originalShop: 'www.amzon.de',
              originalTitle:
                'Sony KD-55XF7596 Bravia 139,7 cm (55 Zoll) Fernseher (Ultra HD, 4K HDR, Android Smart TV) Schwarz',
              pictureLinks: [
                {
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51R2ZL3GFwL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51R2ZL3GFwL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51R2ZL3GFwL._SL75_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71PB449HgrL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51Kz%2BgiOWmL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51Kz%2BgiOWmL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51Kz%2BgiOWmL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91bxMNaJGYL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51-50VbUp4L.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51-50VbUp4L._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51-50VbUp4L._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91u%2BtLSKnFL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/513OwWC-rML.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/513OwWC-rML._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/513OwWC-rML._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91lyOqUFehL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51rQLzBTw9L.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51rQLzBTw9L._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51rQLzBTw9L._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91V5VzwXU0L.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51MeO2d6p2L.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51MeO2d6p2L._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51MeO2d6p2L._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91UtzfLJjHL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/512XIH0ObiL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/512XIH0ObiL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/512XIH0ObiL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71NFwzJUOcL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/31J%2Bz7qlMaL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/31J%2Bz7qlMaL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/31J%2Bz7qlMaL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91cfxKqHERL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51R2ZL3GFwL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51R2ZL3GFwL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51R2ZL3GFwL._SL110_.jpg'
                }
              ],
              price: '63496',
              secondCategory: 1539623290413
            },
            '1542736913606': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-11-20T18:01:53.606Z',
                lastModifiedBy: 'UNKNOWN',
                lastModifiedDate: '2019-01-21T19:26:31.532Z'
              },
              affiliateLink: 'https://amzn.to/2BmhjW8',
              api: 'amazon',
              apiId: 'B07CM6X8HW',
              company: '',
              description:
                '<h2 style="text-align:center"><span style="font-size:24px"><span style="font-family:Georgia,serif"><u>Das ist ein Test &uuml;berschrift</u></span></span></h2>\n\n<p style="text-align:center"><span style="font-size:48px"><span style="font-family:Georgia,serif"><u>Hier sollte eine &Uuml;berschrift stehen</u></span></span></p>\n\n<ul>\n\t<li><strong>Prozessor</strong>: Intel Core i7-8550U (1,80 GHz bis zu 4,00 GHz Burst-Frequenz)</li>\n\t<li><strong>Besonderheiten</strong>: Geb&uuml;ndelte Power mit Intel Core i7 CPU, rasanter SSD und bis zu 10h Akkulaufzeit. Genie&szlig;en Sie gestochen scharfe Bilder auf dem matten 15 Zoll Full-HD Display mit IPS Technologie</li>\n\t<li><strong>Design:</strong> Genie&szlig;en Sie das ultraschlanke- und leichte Vollaluminium-Design. Die extra schmalen Displayr&auml;nder lassen Das Ultrabook noch edler aussehen. Mit der QWERTZ-Tastatur mit <strong>Hintergrundbeleuchtung</strong> k&ouml;nnen Sie auch ganz komfortabel im Dunkeln arbeiten.</li>\n\t<li><strong>Vielf&auml;ltige</strong> Anschl&uuml;sse und Schnittstellen: Bluetooth 4.0, HD Webcam, AC-WLAN, 1x HDMI, 1x USB 3.1, 2x USB 3.0, 1x USB 2.0, SD Kartenleser, 1x Audio In/Out</li>\n\t<li><strong>Herstellergarantie</strong>: 2 Jahre Garantie (Einsende-/ R&uuml;cksendeservice) inkl. 1 Jahr International Travelers Warranty, Lieferumfang: 1x Acer Swift 3, 65W AC-Netzteil</li>\n</ul>\n',
              firstCategory: 1546177598222,
              gender: 'unisex',
              group: 'Computer & Zubehör',
              id: '1542736913606',
              metaData: {
                lastUpdate: 1548098791501,
                linkVisits: 0,
                protokoll:
                  'Update Produkt from Amazon API Date: Mon Jan 21 2019',
                updateError: false,
                visits: 0
              },
              name: 'Acer Swift 3 ',
              occasion: [1527698389950],
              offerListingId:
                '8emVxySi0XnrGGtlUof%2FMJ4lSHRf75Xg19PbPe%2BInpm8ZgtXpfkLBq8HV7nPqLdU9rullJbfHq2J9u7IFVSnRt49scbOoE9iwoXVqux0trY%3D',
              originalLink:
                'https://www.amazon.de/Acer-SF315-52G-84BN-Full-HD-Ultrabook-i7-8550U/dp/B07CM6X8HW?SubscriptionId=AKIAJ6WE2DNROWEZVCYA&tag=dreampresen0c-21&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B07CM6X8HW',
              originalShop: 'www.amazon.de',
              originalTitle:
                'Acer Swift 3 SF315-52G-84BN 39,6 cm (15,6 Full-HD IPS matt) Ultrabook (Intel Core i7-8550U, 8GB RAM, 256GB SSD, NVIDIA GeForce MX150 (2GB VRAM), Win 10) silber',
              pictureLinks: [
                {
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/415uWgkgESL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/415uWgkgESL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/415uWgkgESL._SL75_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71cvmMJ04QL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/31D20JZj-sL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/31D20JZj-sL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/31D20JZj-sL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91ufDeI2B7L.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41Jhak8NeyL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41Jhak8NeyL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41Jhak8NeyL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/816wqwupEcL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/31W8GXxgVML.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/31W8GXxgVML._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/31W8GXxgVML._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71yobUS-p6L.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/31vKUPBzmYL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/31vKUPBzmYL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/31vKUPBzmYL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71NVmG6t8NL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/31v6a6Vyn3L.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/31v6a6Vyn3L._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/31v6a6Vyn3L._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/81X6eVPLhmL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41GIfaLwOwL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41GIfaLwOwL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41GIfaLwOwL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/81EwXzCph5L.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41GUBMn6ZdL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41GUBMn6ZdL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41GUBMn6ZdL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91pcOQfY4sL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/414P0DMD%2BwL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/414P0DMD%2BwL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/414P0DMD%2BwL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91L77%2BGk3NL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/510HwZW6X3L.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/510HwZW6X3L._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/510HwZW6X3L._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/81-w36Pm%2BmL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/413anYtO3JL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/413anYtO3JL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/413anYtO3JL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/91%2BmeCx9DVL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51EI-4rq2KL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51EI-4rq2KL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51EI-4rq2KL._SL110_.jpg'
                },
                {
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51TOMZ-fzlL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51TOMZ-fzlL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51TOMZ-fzlL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/81numg1pypL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/415uWgkgESL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/415uWgkgESL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/415uWgkgESL._SL110_.jpg'
                }
              ],
              price: '99900',
              secondCategory: 1546174045067
            },
            '1548268136055': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2019-01-23T18:28:56.055Z',
                lastModifiedBy: 'UNKNOWN',
                lastModifiedDate: '2019-01-23T19:24:37.351Z'
              },
              affiliateLink: 'https://amzn.to/2TbGjWy',
              api: 'amazon',
              apiId: 'B071CFBXXZ',
              company: '',
              description:
                'PERFEKTES LICHT: Gibt die richtige Menge Licht ab, um Sie durch die Dunkelheit zu führen.<br>AUTOMATISCHE BELEUCHTUNG: Wenn Lichtsensoren Dunkelheit messen, schalten sich die Bewegungssensoren ein, um im richtigen Moment Licht zu spenden. Es werden Bewegungen im 120°-Winkel auf bis zu drei Metern Entfernung erkannt.<br>ENERGIEEFFIZIENT: Drei AAA-Batterien (nicht mitgeliefert) spenden etwa ein Jahr lang angenehmes Licht.<br>NACHTLICHT: Verhindert, dass Sie nachts das Licht einschalten müssen.<br>WAS SIE BEKOMMEN: Drei Lumi Nachtlichter zum Aufkleben, 6 Schrauben, 6 Dübel, eine Bedienungsanleitung, eine Happy Card und 18 Monate Garantie.',
              firstCategory: 1546177598222,
              gender: 'unisex',
              group: 'Beleuchtung',
              id: '1548268136055',
              metaData: {
                create: '2019-01-23T19:25',
                lastUpdate: 1548271477345,
                linkVisits: 0,
                protokoll:
                  'Update Produkt from Amazon API Date: Wed Jan 23 2019',
                updateError: false,
                visits: 0
              },
              name: 'LED Nachtlicht mit Bewegungssensor',
              occasion: [1530034952544, 1527698389950, 1530035255083],
              offerListingId:
                'uspt6pELry5EENJhBijfh9SD556j0H3gG9rUiJOUYnXbiQyU2%2BOqdXLMUfUjZzmwGLiqPqCmw%2FKrhKef9lmoSwSNG%2BdW7bGSaxPQeoO0L8X%2FnoY%2BQZDhk%2FF0x4WnEsaD6Hav%2BAreag1catC3Q86Olw%3D%3D',
              originalLink:
                'https://www.amazon.de/Bewegungssensor-Schrankbeleuchtung-Kinderzimmer-Orientierungslicht-Energieeffizient/dp/B071CFBXXZ?SubscriptionId=AKIAJ6WE2DNROWEZVCYA&tag=dreampresen0c-21&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B071CFBXXZ',
              originalShop: 'www.amazon.de',
              originalTitle:
                'Eufy Lumi 3 Pack LED Nachtlicht mit Bewegungssensor,Warmes weißes LED Lichter,Auto ON/OFF, Schrankbeleuchtung mit Haftend für Kinderzimmer, Schlafzimmer, Orientierungslicht, Energieeffizient (3 Pack)',
              pictureLinks: [
                {
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/315gmTFsZ7L.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/315gmTFsZ7L._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/315gmTFsZ7L._SL75_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71jJhfwsskL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41eSUGa%2Bk4L.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41eSUGa%2Bk4L._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41eSUGa%2Bk4L._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71mDpDB4LGL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51k-30jSXqL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51k-30jSXqL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51k-30jSXqL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/61318Xl5v1L.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/411FJzw1SIL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/411FJzw1SIL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/411FJzw1SIL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71V%2BV2LLq%2BL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41iAc1ULsWL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41iAc1ULsWL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41iAc1ULsWL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71lCMaG9GZL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51gSu2CXg-L.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51gSu2CXg-L._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51gSu2CXg-L._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/61pnEYXZKJL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41xtbvzJsvL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41xtbvzJsvL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41xtbvzJsvL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/51KsanE%2BGhL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/315gmTFsZ7L.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/315gmTFsZ7L._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/315gmTFsZ7L._SL110_.jpg'
                }
              ],
              price: '1499',
              secondCategory: 1546174117923
            },
            '1548269859478': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2019-01-23T18:57:39.478Z',
                lastModifiedBy: 'UNKNOWN',
                lastModifiedDate: '2019-01-23T19:24:37.373Z'
              },
              affiliateLink: 'https://amzn.to/2U63HEK',
              api: 'amazon',
              apiId: 'B07J5YD6FS',
              company: 'Innovative Technology',
              description:
                'Umfangreiche Funktionen - Plattenspieler mit drei Geschwindigkeiten, CD-Player, FM-Radio, Bluetooth und 3,5-mm-Aux-Eingang<br>Beeindruckendes 50er-Jahre-Mahagoni-Styling<br>Wunderschöner Drehknopf für das Analogradio<br>Eingebaute Stereolautsprecher',
              firstCategory: 1546177598222,
              gender: 'unisex',
              group: 'Musical Instruments',
              id: '1548269859478',
              metaData: {
                create: '2019-01-23T19:25',
                lastUpdate: 1548271477345,
                linkVisits: 0,
                protokoll:
                  'Update Produkt from Amazon API Date: Wed Jan 23 2019',
                updateError: false,
                visits: 0
              },
              name: 'Bluethooth Record Player Music Centre mit Plattenspieler',
              occasion: [1530035000315],
              offerListingId:
                'uspt6pELry5EENJhBijfh6iVhKR0trgvdDCWPIfRRa5eQPI5U%2BeCLT360wH%2FhS1dC2KMdMaSl4A54raHFIIHLpcGy%2BpX5Mew9PVTtNyRbus%3D',
              originalLink:
                'https://www.amazon.de/Victrola-Avenue-Bluetooth-Record-Player/dp/B07J5YD6FS?SubscriptionId=AKIAJ6WE2DNROWEZVCYA&tag=dreampresen0c-21&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B07J5YD6FS',
              originalShop: 'www.amazon.de',
              originalTitle:
                'Victrola Park Avenue 5-1 Bluetooth Record Player Music Centre - Expresso',
              pictureLinks: [
                {
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41NBBThozfL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41NBBThozfL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41NBBThozfL._SL75_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/81YRu7LKxYL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51PrTEJ-waL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51PrTEJ-waL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51PrTEJ-waL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/81zROX1I89L.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41bjrLmTWwL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41bjrLmTWwL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41bjrLmTWwL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71rIIV%2B7KUL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/51JXu7ezrQL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/51JXu7ezrQL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/51JXu7ezrQL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71Oxz6hOYvL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41mkwgAJ-oL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41mkwgAJ-oL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41mkwgAJ-oL._SL110_.jpg'
                },
                {
                  hiRes:
                    'https://images-eu.ssl-images-amazon.com/images/I/71cDVdmXKWL.jpg',
                  large:
                    'https://images-eu.ssl-images-amazon.com/images/I/41NBBThozfL.jpg',
                  medium:
                    'https://images-eu.ssl-images-amazon.com/images/I/41NBBThozfL._SL160_.jpg',
                  tiny:
                    'https://images-eu.ssl-images-amazon.com/images/I/41NBBThozfL._SL110_.jpg'
                }
              ],
              price: '16811'
            }
          }
        },
        secondcategory: {
          'en-US': {
            '1539623290413': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-10-15T17:08:10.413Z'
              },
              id: 1539623290413,
              name: 'Test'
            },
            '1546173810837': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:43:30.837Z'
              },
              id: 1546173810837,
              name: 'Armband'
            },
            '1546173822320': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:43:42.320Z'
              },
              id: 1546173822320,
              name: 'Halskette'
            },
            '1546173833280': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:43:53.280Z'
              },
              id: 1546173833280,
              name: 'Ohringe'
            },
            '1546173843645': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:44:03.645Z'
              },
              id: 1546173843645,
              name: 'Tischdeko'
            },
            '1546173856224': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:44:16.224Z',
                lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                lastModifiedDate: '2018-12-30T12:45:43.674Z'
              },
              id: 1546173856224,
              name: 'Kerzen'
            },
            '1546174045067': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:47:25.067Z'
              },
              id: 1546174045067,
              name: 'Notebooks & Pc`s'
            },
            '1546174059533': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:47:39.533Z'
              },
              id: 1546174059533,
              name: 'Fehrnseher'
            },
            '1546174076211': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:47:56.211Z'
              },
              id: 1546174076211,
              name: 'Smartphones'
            },
            '1546174088366': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:48:08.366Z'
              },
              id: 1546174088366,
              name: 'Tablets'
            },
            '1546174117923': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:48:37.923Z'
              },
              id: 1546174117923,
              name: 'Lampen'
            },
            '1546174129882': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:48:49.882Z'
              },
              id: 1546174129882,
              name: 'Fleisch'
            },
            '1546174141320': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:49:01.320Z'
              },
              id: 1546174141320,
              name: 'Spirituosen'
            },
            '1546174149180': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:49:09.180Z'
              },
              id: 1546174149180,
              name: 'Bier'
            },
            '1546174160649': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:49:20.649Z'
              },
              id: 1546174160649,
              name: 'Wein'
            },
            '1546174181253': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:49:41.254Z'
              },
              id: 1546174181253,
              name: 'Alkoholfreie Getränke'
            },
            '1546174192860': {
              __meta__: {
                createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
                createdDate: '2018-12-30T12:49:52.860Z'
              },
              id: 1546174192860,
              name: 'Süßigkeiten'
            }
          }
        },
        startsite: {
          'en-US': {
            __meta__: {
              createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
              createdDate: '2018-05-30T17:13:15.197Z',
              lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
              lastModifiedDate: '2018-07-14T10:19:43.455Z'
            },
            bigStartImage: [1531563333298],
            id: 'startsite',
            mediumStartImage: [1531563333298],
            smalStartImage: [1527700339772],
            smallStartImage: [1531563333298],
            text:
              'Das perfekte Geschenk zu jedem deiner Anlässe! Mimi ich liebe dich!'
          }
        }
      },
      id: 'production',
      navigation: {
        mainNav: {
          'en-US': {
            __meta__: {
              createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
              createdDate: '2019-02-21T08:24:22.671Z'
            },
            id: 'mainNav',
            items: [
              {
                attachment: 0,
                component: '',
                cssClass: 'homepage',
                id: 1550737379833,
                newWindow: false,
                order: 0,
                parentIndex: 0,
                title: 'Home',
                url: '/',
                uuid: 1550737379833
              },
              {
                attachment: 0,
                component: '',
                cssClass: 'about',
                id: 1550737393540,
                newWindow: false,
                order: 1,
                parentIndex: 0,
                title: 'About',
                url: '/about',
                uuid: 1550737393540
              },
              {
                attachment: 0,
                component: '',
                cssClass: 'about',
                id: 1550737414320,
                newWindow: false,
                order: 2,
                parentIndex: 1550737393540,
                title: 'Team',
                url: '/about/team',
                uuid: 1550737414320
              },
              {
                attachment: 0,
                component: '',
                cssClass: 'about',
                id: 1550737442171,
                newWindow: false,
                order: 3,
                parentIndex: 1550737393540,
                title: 'Careers',
                url: '/about/careers',
                uuid: 1550737442171
              }
            ],
            title: 'Main Nav'
          }
        }
      },
      schemas: {
        anzel: {
          __meta__: {
            createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
            createdDate: '2019-02-25T13:25:29.218Z'
          },
          description: '',
          enabled: true,
          fields: [
            {
              description: '',
              fieldSeparator: ' - ',
              gridColumns: {
                lg: 12,
                md: 12,
                sm: 12,
                xs: 12
              },
              hidden: false,
              id: 1551101112603,
              key: 'field_1551101112623',
              relation: 'fl_users',
              relationalFieldsToShow: ['id', 'email', 'displayName'],
              show: true,
              title: 'Field',
              type: 'tree-relational'
            }
          ],
          group: 'Anzel',
          icon: '',
          id: 'anzel',
          sortable: true,
          title: 'Anzel',
          type: 'collection'
        },
        dataProtection: {
          __meta__: {
            createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            createdDate: '2018-06-09T16:33:02.387Z',
            lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            lastModifiedDate: '2018-06-19T18:33:32.400Z'
          },
          description: 'Datenschutzerklärung',
          enabled: true,
          fields: [
            {
              defaultValue: '',
              description: 'Text der Datenschutzerklärung',
              gridColumns: {
                lg: 12,
                md: 12,
                sm: 12,
                xs: 12
              },
              id: 1529433075571,
              key: 'text',
              show: false,
              title: 'text',
              type: 'wysiwyg-cke'
            }
          ],
          group: 'Law',
          icon: '',
          id: 'dataProtection',
          sortable: true,
          title: 'DataProtection',
          type: 'single'
        },
        firstcategory: {
          __meta__: {
            createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            createdDate: '2018-05-27T11:05:32.201Z',
            lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            lastModifiedDate: '2018-12-30T13:44:25.428Z'
          },
          description: 'Übergeordnete Kategorie',
          enabled: true,
          fields: [
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: false,
                    message: '^Field is required'
                  },
                  uniqueKey: 'ByQgWGu17'
                }
              ],
              defaultValue: '',
              description: 'Name der Übergeordneten Kategorie',
              gridColumns: {
                lg: 6,
                md: 12,
                sm: 12,
                xs: 12
              },
              id: 1527419077505,
              key: 'name',
              show: true,
              title: 'Name',
              type: 'text'
            },
            {
              description: 'Zugehörige unterkategorien',
              fieldSeparator: ' - ',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              hidden: false,
              id: 1546173353552,
              key: 'secondCategory',
              multiple: true,
              relation: 'secondcategory',
              relationalFieldsToShow: ['name'],
              show: true,
              title: 'Second Category',
              type: 'select-relational'
            },
            {
              defaultValue: true,
              description: 'Zustand der Kategorie',
              gridColumns: {
                lg: 3,
                md: 3,
                sm: 12,
                xs: 12
              },
              hidden: false,
              id: 1546174218797,
              key: 'active',
              show: true,
              title: 'active',
              type: 'switch'
            }
          ],
          group: 'firstcategory',
          icon: '',
          id: 'firstcategory',
          sortable: true,
          title: 'firstcategory',
          type: 'collection'
        },
        footer: {
          __meta__: {
            createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            createdDate: '2018-06-09T16:17:35.713Z',
            lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            lastModifiedDate: '2018-06-09T16:34:45.183Z'
          },
          description: 'Fußbereich der Webseite',
          enabled: true,
          fields: [
            {
              description: 'Logo der Webseite',
              gridColumns: {
                lg: 3,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1528560407364,
              key: 'logo',
              limit: 1,
              mediaTypes: ['images'],
              show: false,
              title: 'logo',
              type: 'media'
            },
            {
              defaultValue: '',
              description: 'Kurzer Text über uns',
              gridColumns: {
                lg: 12,
                md: 12,
                sm: 12,
                xs: 12
              },
              id: 1528562019240,
              key: 'aboutUs',
              show: false,
              title: 'About Us',
              type: 'text'
            }
          ],
          group: 'Group Name',
          icon: '',
          id: 'footer',
          sortable: true,
          title: 'footer',
          type: 'collection'
        },
        occasion: {
          __meta__: {
            createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            createdDate: '2018-05-27T11:02:33.742Z',
            lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            lastModifiedDate: '2018-05-30T16:38:20.053Z'
          },
          description: 'Anlässe',
          enabled: true,
          fields: [
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: false,
                    message: '^Field is required'
                  },
                  uniqueKey: 'HJTZrG_1Q'
                }
              ],
              defaultValue: '',
              description: 'Name des Anlass',
              gridColumns: {
                lg: 6,
                md: 12,
                sm: 12,
                xs: 12
              },
              id: 1527418929985,
              key: 'name',
              show: true,
              title: 'Name',
              type: 'text'
            },
            {
              defaultValue: true,
              description: 'Anzeige des Anlasses ein und auschalten',
              gridColumns: {
                lg: 3,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1527419553330,
              key: 'activation',
              show: true,
              title: 'Activation',
              type: 'switch'
            },
            {
              defaultValue: 0,
              description: 'Position der Anzeige auf der Startseite',
              gridColumns: {
                lg: 3,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1527419754349,
              key: 'position',
              show: true,
              title: 'Position',
              type: 'number'
            },
            {
              defaultValue: '',
              description: 'Datum des Anlass',
              gridColumns: {
                lg: 3,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1527420044884,
              key: 'date',
              show: false,
              title: 'Date',
              type: 'date'
            },
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: false,
                    message: '^Field is required'
                  },
                  uniqueKey: 'BkdYHfukX'
                }
              ],
              description:
                'Bild welches auf der Startseite als Anlass angezeigt wird',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1527420221128,
              key: 'picture',
              limit: 1,
              mediaTypes: ['images'],
              show: true,
              title: 'Picture',
              type: 'media'
            }
          ],
          group: 'Group Name',
          icon: '',
          id: 'occasion',
          sortable: true,
          title: 'occasion',
          type: 'collection'
        },
        products: {
          __meta__: {
            createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            createdDate: '2018-05-27T11:11:04.813Z',
            lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            lastModifiedDate: '2019-01-23T18:26:40.923Z'
          },
          description: 'Produkte',
          enabled: true,
          fields: [
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: false,
                    message: 'Bitte geben sie einen Namen für das Produkt ein'
                  },
                  uniqueKey: 'H1_HfGu1m'
                }
              ],
              defaultValue: '',
              description: 'Name des Produktes',
              gridColumns: {
                lg: 6,
                md: 12,
                sm: 12,
                xs: 12
              },
              id: 1527419441379,
              key: 'name',
              show: true,
              title: 'Name',
              type: 'text'
            },
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: false,
                    message:
                      'Wählen sie ein geeignetes Geschlecht für das Produkt'
                  },
                  uniqueKey: 'mfJWb5PAx'
                }
              ],
              description: '',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1541691706670,
              key: 'gender',
              multiple: false,
              options: [
                {
                  label: 'Mänlich',
                  uniqueKey: 'zpsPjVLxiJ',
                  value: 'male'
                },
                {
                  label: 'Weiblich',
                  uniqueKey: 'wA-U0GQX8',
                  value: 'female'
                },
                {
                  label: 'Egal',
                  uniqueKey: 'fwaJOkFPs',
                  value: 'unisex'
                }
              ],
              show: false,
              title: 'Gender',
              type: 'select'
            },
            {
              defaultValue: '',
              description: 'Original Link zum Produkt',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1527421413729,
              key: 'originalLink',
              show: false,
              title: 'Original Link',
              type: 'text'
            },
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: false,
                    message: 'Bitte geben sie die URL des Orginalshops ein'
                  },
                  uniqueKey: 'V7D-igk-R'
                }
              ],
              defaultValue: '',
              description: 'Link zum Original Shop',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1527422011640,
              key: 'originalShop',
              show: false,
              title: 'Original Shop',
              type: 'text'
            },
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: false,
                    message:
                      'Bitte geben sie einen Generierten AffiliateLink ein, fals sie keinen besitzten geben sie die URL zu dem Produkt an.'
                  },
                  uniqueKey: 'i67yz236s'
                }
              ],
              defaultValue: '',
              description: '',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1531045180126,
              key: 'affiliateLink',
              show: false,
              title: 'AffiliateLink',
              type: 'text'
            },
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: true,
                    message: 'Bitte wählen sie ihre API aus.'
                  },
                  uniqueKey: 'r1tLNwJX7'
                }
              ],
              description: 'Service des Produktes (API)',
              gridColumns: {
                lg: 3,
                md: 3,
                sm: 12,
                xs: 12
              },
              id: 1531044854516,
              key: 'api',
              multiple: false,
              options: [
                {
                  label: 'Amazon',
                  uniqueKey: 'Hym4EDyQQ',
                  value: 'amazon'
                },
                {
                  label: 'Keine API',
                  uniqueKey: 'BJWSEwkXm',
                  value: 'no'
                }
              ],
              show: true,
              title: 'api',
              type: 'select'
            },
            {
              defaultValue: '',
              description: 'NoAPI => Keine | Amazon => ASIN',
              gridColumns: {
                lg: 3,
                md: 3,
                sm: 12,
                xs: 12
              },
              id: 1542622207244,
              key: 'apiId',
              show: false,
              title: 'ApiId',
              type: 'text'
            },
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: false,
                    message:
                      'Wählen sie ein oder mehrere Anlässe für dieses Produkt.'
                  },
                  uniqueKey: 'SJChLf_kQ'
                }
              ],
              description: 'Anlass zum verschenken dieses Produktes',
              fieldSeparator: '-',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1527420541340,
              key: 'occasion',
              multiple: true,
              relation: 'occasion',
              relationalFieldsToShow: ['name'],
              show: true,
              title: 'Occasion',
              type: 'select-relational'
            },
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: false,
                    message:
                      'Bitte wählen sie eine passende über Kategorie aus.'
                  },
                  uniqueKey: 'B1n0WIOyQ'
                }
              ],
              description: 'Auswahl der Übergeordneten Kategorie',
              fieldSeparator: '-',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              hidden: false,
              id: 1527435664316,
              key: 'firstCategory',
              multiple: false,
              relation: 'firstcategory',
              relationalFieldsToShow: ['name'],
              show: true,
              title: 'First Category',
              type: 'select-relational'
            },
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: false,
                    message: '^Field is required'
                  },
                  uniqueKey: 'lAEKvfzVr'
                }
              ],
              description: 'Auswahl der Untergeordneten Kategorie',
              fieldSeparator: ' - ',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              hidden: false,
              id: 1527435759772,
              key: 'secondCategory',
              multiple: false,
              relation: 'secondcategory',
              relationalFieldsToShow: ['name'],
              show: true,
              title: 'Second Category',
              type: 'select-relational'
            },
            {
              description: 'Bilder welche Lokal vorhanden sind',
              gridColumns: {
                lg: 3,
                md: 3,
                sm: 12,
                xs: 12
              },
              id: 1542622420490,
              key: 'ppictures',
              limit: 10,
              mediaTypes: ['images'],
              show: false,
              title: 'Ppictures',
              type: 'media'
            },
            {
              defaultValue: '',
              description: 'Beschreibung des Produktes',
              gridColumns: {
                lg: 12,
                md: 12,
                sm: 12,
                xs: 12
              },
              hidden: false,
              id: 1542622300649,
              key: 'description',
              show: false,
              title: 'Description',
              type: 'wysiwyg-cke'
            },
            {
              description:
                'Link zu einem Bild (Bitte nur verwenden wenn keine Api verwendet wird! Bilder werden nur geladen sobald der Bereich NoAPI Aktive ist!!!)',
              gridColumns: {
                xs: 12
              },
              hidden: false,
              id: 1530351876391,
              key: 'pictureLinks',
              layout: 'table',
              options: [
                {
                  defaultValue: '',
                  description:
                    'Link zu einem Bild mit ganz schwacher auflösung',
                  gridColumns: {
                    lg: 12,
                    md: 12,
                    sm: 12,
                    xs: 12
                  },
                  id: 1530352082561,
                  key: 'tiny',
                  show: false,
                  title: 'tiny',
                  type: 'text'
                },
                {
                  defaultValue: '',
                  description: '',
                  gridColumns: {
                    lg: 12,
                    md: 12,
                    sm: 12,
                    xs: 12
                  },
                  id: 1542369162729,
                  key: 'medium',
                  show: false,
                  title: 'medium',
                  type: 'text'
                },
                {
                  defaultValue: '',
                  description: '',
                  gridColumns: {
                    lg: 12,
                    md: 12,
                    sm: 12,
                    xs: 12
                  },
                  id: 1542369164031,
                  key: 'large',
                  show: false,
                  title: 'large',
                  type: 'text'
                },
                {
                  defaultValue: '',
                  description: '',
                  gridColumns: {
                    lg: 12,
                    md: 12,
                    sm: 12,
                    xs: 12
                  },
                  id: 1542369165899,
                  key: 'hiRes',
                  show: false,
                  title: 'hiRes',
                  type: 'text'
                },
                {
                  defaultValue: '',
                  description: '',
                  gridColumns: {
                    lg: 12,
                    md: 12,
                    sm: 12,
                    xs: 12
                  },
                  id: 1542369167432,
                  key: 'other',
                  show: false,
                  title: 'other',
                  type: 'text'
                }
              ],
              show: false,
              title: 'Picture Links',
              type: 'repeater'
            },
            {
              defaultValue: '',
              description: '',
              gridColumns: {
                lg: 3,
                md: 3,
                sm: 3,
                xs: 9
              },
              id: 1541691889255,
              key: 'price',
              show: false,
              title: 'Price',
              type: 'number'
            },
            {
              defaultValue: '',
              description: 'Produktkategorie im Originalshop',
              gridColumns: {
                lg: 3,
                md: 3,
                sm: 12,
                xs: 12
              },
              id: 1542618705124,
              key: 'group',
              show: false,
              title: 'ProductGroup',
              type: 'text'
            },
            {
              defaultValue: '',
              description: 'Original Titel im Online Shop',
              gridColumns: {
                lg: 3,
                md: 3,
                sm: 12,
                xs: 12
              },
              id: 1542618538753,
              key: 'originalTitle',
              show: false,
              title: 'OriginalTitle',
              type: 'text'
            },
            {
              defaultValue: '',
              description: 'Hersteller des Produktes',
              gridColumns: {
                lg: 3,
                md: 3,
                sm: 12,
                xs: 12
              },
              id: 1542618585935,
              key: 'company',
              show: false,
              title: 'Company',
              type: 'text'
            },
            {
              description: 'Daten welche vom Computer generiert werden',
              gridColumns: {
                lg: 12,
                md: 12,
                sm: 12,
                xs: 12
              },
              hidden: false,
              id: 1542368528883,
              key: 'metaData',
              options: [
                {
                  defaultValue: '',
                  description: '',
                  gridColumns: {
                    lg: 12,
                    md: 12,
                    sm: 12,
                    xs: 12
                  },
                  id: 1542368600982,
                  key: 'protokoll',
                  show: false,
                  title: 'Protokoll',
                  type: 'textarea'
                },
                {
                  defaultValue: 0,
                  description: 'Anzahl der Besucher auf der Produktseite',
                  gridColumns: {
                    lg: 3,
                    md: 3,
                    sm: 12,
                    xs: 12
                  },
                  id: 1542368613874,
                  key: 'visits',
                  show: false,
                  step: '1',
                  title: 'Visits',
                  type: 'number'
                },
                {
                  defaultValue: 0,
                  description: 'Datum und Zeitpunkt des letzten Updates',
                  gridColumns: {
                    lg: 3,
                    md: 3,
                    sm: 12,
                    xs: 12
                  },
                  id: 1542368667304,
                  key: 'lastUpdate',
                  show: false,
                  step: '1',
                  title: 'LastUpdate',
                  type: 'number'
                },
                {
                  defaultValue: 0,
                  description:
                    'Besucher welche den Affillate Link ausgewählt haben',
                  gridColumns: {
                    lg: 3,
                    md: 3,
                    sm: 12,
                    xs: 12
                  },
                  id: 1542368736979,
                  key: 'linkVisits',
                  show: false,
                  step: '1',
                  title: 'LinkVisits',
                  type: 'number'
                },
                {
                  defaultValue: false,
                  description:
                    'Aktiviert wenn ein Fehler beim Updaten über eine API enstanden ist',
                  gridColumns: {
                    lg: 3,
                    md: 3,
                    sm: 3,
                    xs: 3
                  },
                  id: 1542724453717,
                  key: 'updateError',
                  show: false,
                  title: 'UpdateError',
                  type: 'boolean'
                },
                {
                  defaultValue: '2019-01-23T19:25',
                  description: '',
                  displayFormat: 'DD/MM/YYYY hh:mm',
                  gridColumns: {
                    lg: 3,
                    md: 3,
                    sm: 12,
                    xs: 12
                  },
                  hidden: false,
                  id: 1548267935498,
                  key: 'create',
                  show: false,
                  title: 'create',
                  type: 'datetime-local'
                }
              ],
              overviewFields: ['updateError', 'visits'],
              show: true,
              title: 'MetaData',
              type: 'fieldset'
            },
            {
              defaultValue: '',
              description: 'Amazon Id, muss nicht selbst gefüllt werden',
              gridColumns: {
                lg: 3,
                md: 3,
                sm: 3,
                xs: 3
              },
              hidden: true,
              id: 1548091693072,
              key: 'offerListingId',
              show: false,
              title: 'offerListingId',
              type: 'text'
            }
          ],
          group: 'Group Name',
          icon: '',
          id: 'products',
          sortable: true,
          title: 'products',
          type: 'collection'
        },
        secondcategory: {
          __meta__: {
            createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            createdDate: '2018-05-27T11:10:08.894Z',
            lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            lastModifiedDate: '2018-12-30T13:28:21.645Z'
          },
          description: 'Untergeordnete Kategorie',
          enabled: true,
          fields: [
            {
              defaultValue: '',
              description: 'Untergeordnete Kategorie Name',
              gridColumns: {
                lg: 6,
                md: 12,
                sm: 12,
                xs: 12
              },
              id: 1527419392376,
              key: 'name',
              show: false,
              title: 'Name',
              type: 'text'
            }
          ],
          group: 'secondcategory',
          icon: '',
          id: 'secondcategory',
          sortable: true,
          title: 'secondcategory',
          type: 'collection'
        },
        startsite: {
          __meta__: {
            createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            createdDate: '2018-05-27T15:54:27.961Z',
            lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
            lastModifiedDate: '2018-05-30T17:23:55.850Z'
          },
          description: 'Texte und Bilder für die Startseite',
          enabled: true,
          fields: [
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: true,
                    message: '^Field is required'
                  },
                  uniqueKey: 'S1yTaIYJX'
                }
              ],
              defaultValue: '',
              description:
                'Text welcher in der Mitte des Bildes auf der Startseite angetzeigt wird',
              gridColumns: {
                lg: 12,
                md: 12,
                sm: 12,
                xs: 12
              },
              id: 1527436133336,
              key: 'text',
              show: true,
              title: 'Text',
              type: 'text'
            },
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: true,
                    message: '^Field is required'
                  },
                  uniqueKey: 'ry5ia8Y17'
                }
              ],
              description: 'Start Bild für große Bildschirme',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1527436196999,
              key: 'bigStartImage',
              limit: 1,
              mediaTypes: ['images'],
              show: true,
              title: 'Big Start Image',
              type: 'media'
            },
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: true,
                    message: '^Field is required'
                  },
                  uniqueKey: 'H1ZhaIYy7'
                }
              ],
              description: 'Start Bild für mittel große Bildschirme',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1527436307772,
              key: 'mediumStartImage',
              limit: 1,
              mediaTypes: ['images'],
              show: true,
              title: 'Medium Start Image',
              type: 'media'
            },
            {
              constraints: [
                {
                  rule: 'presence',
                  ruleValue: {
                    allowEmpty: true,
                    message: '^Field is required'
                  },
                  uniqueKey: 'H1Y36IKJm'
                }
              ],
              description: 'Start Bild für kleine Bildschirme',
              gridColumns: {
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12
              },
              id: 1527436415580,
              key: 'smallStartImage',
              limit: 1,
              mediaTypes: ['images'],
              show: true,
              title: 'Small Start Image',
              type: 'media'
            }
          ],
          group: 'Startsite',
          icon: '',
          id: 'startsite',
          sortable: true,
          title: 'Startsite',
          type: 'single'
        }
      }
    }
  },
  media: {
    files: {
      '1528620608859': {
        __meta__: {
          createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          createdDate: '2018-06-10T08:50:10.816Z'
        },
        contentType: 'image/png',
        file: '1528620608859_DPLogoBlack.png',
        folderId: 1527417855487,
        id: 1528620608859,
        sizes: [
          {
            height: 9999,
            path: '120_9999_100',
            quality: 1,
            width: 120
          },
          {
            height: 9999,
            path: '240_9999_100',
            quality: 1,
            width: 240
          },
          {
            height: 9999,
            path: '320_9999_100',
            quality: 1,
            width: 320
          },
          {
            height: 9999,
            path: '480_9999_100',
            quality: 1,
            width: 480
          },
          {
            height: 9999,
            path: '586_9999_100',
            quality: 1,
            width: 586
          },
          {
            height: 9999,
            path: '640_9999_100',
            quality: 1,
            width: 640
          },
          {
            height: 9999,
            path: '800_9999_100',
            quality: 1,
            width: 800
          },
          {
            height: 9999,
            path: '960_9999_100',
            quality: 1,
            width: 960
          },
          {
            height: 9999,
            path: '1024_9999_100',
            quality: 1,
            width: 1024
          },
          {
            height: 9999,
            path: '1280_9999_100',
            quality: 1,
            width: 1280
          },
          {
            height: 9999,
            path: '1600_9999_100',
            quality: 1,
            width: 1600
          },
          {
            height: 9999,
            path: '1920_9999_100',
            quality: 1,
            width: 1920
          },
          {
            height: 9999,
            path: '2840_9999_100',
            quality: 1,
            width: 2840
          }
        ],
        type: 'images'
      },
      '1528620608862': {
        __meta__: {
          createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          createdDate: '2018-06-10T08:50:10.947Z'
        },
        contentType: 'image/png',
        file: '1528620608862_DPLogoGrey03.png',
        folderId: 1527417855487,
        id: 1528620608862,
        sizes: [
          {
            height: 9999,
            path: '120_9999_100',
            quality: 1,
            width: 120
          },
          {
            height: 9999,
            path: '240_9999_100',
            quality: 1,
            width: 240
          },
          {
            height: 9999,
            path: '320_9999_100',
            quality: 1,
            width: 320
          },
          {
            height: 9999,
            path: '480_9999_100',
            quality: 1,
            width: 480
          },
          {
            height: 9999,
            path: '586_9999_100',
            quality: 1,
            width: 586
          },
          {
            height: 9999,
            path: '640_9999_100',
            quality: 1,
            width: 640
          },
          {
            height: 9999,
            path: '800_9999_100',
            quality: 1,
            width: 800
          },
          {
            height: 9999,
            path: '960_9999_100',
            quality: 1,
            width: 960
          },
          {
            height: 9999,
            path: '1024_9999_100',
            quality: 1,
            width: 1024
          },
          {
            height: 9999,
            path: '1280_9999_100',
            quality: 1,
            width: 1280
          },
          {
            height: 9999,
            path: '1600_9999_100',
            quality: 1,
            width: 1600
          },
          {
            height: 9999,
            path: '1920_9999_100',
            quality: 1,
            width: 1920
          },
          {
            height: 9999,
            path: '2840_9999_100',
            quality: 1,
            width: 2840
          }
        ],
        type: 'images'
      },
      '1528620608864': {
        __meta__: {
          createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          createdDate: '2018-06-10T08:50:11.167Z'
        },
        contentType: 'image/png',
        file: '1528620608864_DPLogoGrey04.png',
        folderId: 1527417855487,
        id: 1528620608864,
        sizes: [
          {
            height: 9999,
            path: '120_9999_100',
            quality: 1,
            width: 120
          },
          {
            height: 9999,
            path: '240_9999_100',
            quality: 1,
            width: 240
          },
          {
            height: 9999,
            path: '320_9999_100',
            quality: 1,
            width: 320
          },
          {
            height: 9999,
            path: '480_9999_100',
            quality: 1,
            width: 480
          },
          {
            height: 9999,
            path: '586_9999_100',
            quality: 1,
            width: 586
          },
          {
            height: 9999,
            path: '640_9999_100',
            quality: 1,
            width: 640
          },
          {
            height: 9999,
            path: '800_9999_100',
            quality: 1,
            width: 800
          },
          {
            height: 9999,
            path: '960_9999_100',
            quality: 1,
            width: 960
          },
          {
            height: 9999,
            path: '1024_9999_100',
            quality: 1,
            width: 1024
          },
          {
            height: 9999,
            path: '1280_9999_100',
            quality: 1,
            width: 1280
          },
          {
            height: 9999,
            path: '1600_9999_100',
            quality: 1,
            width: 1600
          },
          {
            height: 9999,
            path: '1920_9999_100',
            quality: 1,
            width: 1920
          },
          {
            height: 9999,
            path: '2840_9999_100',
            quality: 1,
            width: 2840
          }
        ],
        type: 'images'
      },
      '1531563092357': {
        __meta__: {
          createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          createdDate: '2018-07-14T10:11:37.281Z'
        },
        contentType: 'image/jpeg',
        file: '1531563092357_Beziehung.jpg',
        folderId: 1527419518018,
        id: 1531563092357,
        sizes: [
          {
            height: 9999,
            path: '150_9999_100',
            quality: '',
            uniqueKey: 'qRyLiJ0wq',
            width: 150
          },
          {
            height: 9999,
            path: '300_9999_100',
            quality: 1,
            uniqueKey: 'TZXIrsqNr_',
            width: 300
          },
          {
            height: 9999,
            path: '480_9999_97',
            quality: '0.97',
            uniqueKey: 'YR6ZWOGue3',
            width: 480
          },
          {
            height: 9999,
            path: '720_9999_100',
            quality: '',
            uniqueKey: 'mKP-q0ySfU',
            width: 720
          },
          {
            height: 9999,
            path: '1024_9999_100',
            quality: 1,
            uniqueKey: '0-ekE8hl7Y',
            width: 1024
          },
          {
            height: 9999,
            path: '1920_9999_100',
            quality: 1,
            uniqueKey: 'HOZLtp2G0m',
            width: 1920
          }
        ],
        type: 'images'
      },
      '1531563101325': {
        __meta__: {
          createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          createdDate: '2018-07-14T10:11:50.083Z'
        },
        contentType: 'image/jpeg',
        file: '1531563101325_FürDieFrau.jpg',
        folderId: 1527419518018,
        id: 1531563101325,
        sizes: [
          {
            height: 9999,
            path: '150_9999_100',
            quality: '',
            uniqueKey: 'qRyLiJ0wq',
            width: 150
          },
          {
            height: 9999,
            path: '300_9999_100',
            quality: 1,
            uniqueKey: 'TZXIrsqNr_',
            width: 300
          },
          {
            height: 9999,
            path: '480_9999_97',
            quality: '0.97',
            uniqueKey: 'YR6ZWOGue3',
            width: 480
          },
          {
            height: 9999,
            path: '720_9999_100',
            quality: '',
            uniqueKey: 'mKP-q0ySfU',
            width: 720
          },
          {
            height: 9999,
            path: '1024_9999_100',
            quality: 1,
            uniqueKey: '0-ekE8hl7Y',
            width: 1024
          },
          {
            height: 9999,
            path: '1920_9999_100',
            quality: 1,
            uniqueKey: 'HOZLtp2G0m',
            width: 1920
          }
        ],
        type: 'images'
      },
      '1531563114467': {
        __meta__: {
          createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          createdDate: '2018-07-14T10:12:01.949Z'
        },
        contentType: 'image/jpeg',
        file: '1531563114467_FürEchteMänner.jpg',
        folderId: 1527419518018,
        id: 1531563114467,
        sizes: [
          {
            height: 9999,
            path: '150_9999_100',
            quality: '',
            uniqueKey: 'qRyLiJ0wq',
            width: 150
          },
          {
            height: 9999,
            path: '300_9999_100',
            quality: 1,
            uniqueKey: 'TZXIrsqNr_',
            width: 300
          },
          {
            height: 9999,
            path: '480_9999_97',
            quality: '0.97',
            uniqueKey: 'YR6ZWOGue3',
            width: 480
          },
          {
            height: 9999,
            path: '720_9999_100',
            quality: '',
            uniqueKey: 'mKP-q0ySfU',
            width: 720
          },
          {
            height: 9999,
            path: '1024_9999_100',
            quality: 1,
            uniqueKey: '0-ekE8hl7Y',
            width: 1024
          },
          {
            height: 9999,
            path: '1920_9999_100',
            quality: 1,
            uniqueKey: 'HOZLtp2G0m',
            width: 1920
          }
        ],
        type: 'images'
      },
      '1531563126373': {
        __meta__: {
          createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          createdDate: '2018-07-14T10:12:15.506Z'
        },
        contentType: 'image/jpeg',
        file: '1531563126373_Geburtstag.jpg',
        folderId: 1527419518018,
        id: 1531563126373,
        sizes: [
          {
            height: 9999,
            path: '150_9999_100',
            quality: '',
            uniqueKey: 'qRyLiJ0wq',
            width: 150
          },
          {
            height: 9999,
            path: '300_9999_100',
            quality: 1,
            uniqueKey: 'TZXIrsqNr_',
            width: 300
          },
          {
            height: 9999,
            path: '480_9999_97',
            quality: '0.97',
            uniqueKey: 'YR6ZWOGue3',
            width: 480
          },
          {
            height: 9999,
            path: '720_9999_100',
            quality: '',
            uniqueKey: 'mKP-q0ySfU',
            width: 720
          },
          {
            height: 9999,
            path: '1024_9999_100',
            quality: 1,
            uniqueKey: '0-ekE8hl7Y',
            width: 1024
          },
          {
            height: 9999,
            path: '1920_9999_100',
            quality: 1,
            uniqueKey: 'HOZLtp2G0m',
            width: 1920
          }
        ],
        type: 'images'
      },
      '1531563142990': {
        __meta__: {
          createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          createdDate: '2018-07-14T10:12:30.022Z'
        },
        contentType: 'image/jpeg',
        file: '1531563142990_Hochzeit.jpg',
        folderId: 1527419518018,
        id: 1531563142990,
        sizes: [
          {
            height: 9999,
            path: '150_9999_100',
            quality: '',
            uniqueKey: 'qRyLiJ0wq',
            width: 150
          },
          {
            height: 9999,
            path: '300_9999_100',
            quality: 1,
            uniqueKey: 'TZXIrsqNr_',
            width: 300
          },
          {
            height: 9999,
            path: '480_9999_97',
            quality: '0.97',
            uniqueKey: 'YR6ZWOGue3',
            width: 480
          },
          {
            height: 9999,
            path: '720_9999_100',
            quality: '',
            uniqueKey: 'mKP-q0ySfU',
            width: 720
          },
          {
            height: 9999,
            path: '1024_9999_100',
            quality: 1,
            uniqueKey: '0-ekE8hl7Y',
            width: 1024
          },
          {
            height: 9999,
            path: '1920_9999_100',
            quality: 1,
            uniqueKey: 'HOZLtp2G0m',
            width: 1920
          }
        ],
        type: 'images'
      },
      '1531563188306': {
        __meta__: {
          createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          createdDate: '2018-07-14T10:13:15.075Z'
        },
        contentType: 'image/jpeg',
        file: '1531563188306_MutterTag.jpg',
        folderId: 1527419518018,
        id: 1531563188306,
        sizes: [
          {
            height: 9999,
            path: '150_9999_100',
            quality: '',
            uniqueKey: 'qRyLiJ0wq',
            width: 150
          },
          {
            height: 9999,
            path: '300_9999_100',
            quality: 1,
            uniqueKey: 'TZXIrsqNr_',
            width: 300
          },
          {
            height: 9999,
            path: '480_9999_97',
            quality: '0.97',
            uniqueKey: 'YR6ZWOGue3',
            width: 480
          },
          {
            height: 9999,
            path: '720_9999_100',
            quality: '',
            uniqueKey: 'mKP-q0ySfU',
            width: 720
          },
          {
            height: 9999,
            path: '1024_9999_100',
            quality: 1,
            uniqueKey: '0-ekE8hl7Y',
            width: 1024
          },
          {
            height: 9999,
            path: '1920_9999_100',
            quality: 1,
            uniqueKey: 'HOZLtp2G0m',
            width: 1920
          }
        ],
        type: 'images'
      },
      '1531563204262': {
        __meta__: {
          createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          createdDate: '2018-07-14T10:13:28.996Z'
        },
        contentType: 'image/jpeg',
        file: '1531563204262_Ostern.jpg',
        folderId: 1527419518018,
        id: 1531563204262,
        sizes: [
          {
            height: 9999,
            path: '150_9999_100',
            quality: '',
            uniqueKey: 'qRyLiJ0wq',
            width: 150
          },
          {
            height: 9999,
            path: '300_9999_100',
            quality: 1,
            uniqueKey: 'TZXIrsqNr_',
            width: 300
          },
          {
            height: 9999,
            path: '480_9999_97',
            quality: '0.97',
            uniqueKey: 'YR6ZWOGue3',
            width: 480
          },
          {
            height: 9999,
            path: '720_9999_100',
            quality: '',
            uniqueKey: 'mKP-q0ySfU',
            width: 720
          },
          {
            height: 9999,
            path: '1024_9999_100',
            quality: 1,
            uniqueKey: '0-ekE8hl7Y',
            width: 1024
          },
          {
            height: 9999,
            path: '1920_9999_100',
            quality: 1,
            uniqueKey: 'HOZLtp2G0m',
            width: 1920
          }
        ],
        type: 'images'
      },
      '1531563213573': {
        __meta__: {
          createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          createdDate: '2018-07-14T10:13:42.922Z'
        },
        contentType: 'image/jpeg',
        file: '1531563213573_Romatisch.jpg',
        folderId: 1527419518018,
        id: 1531563213573,
        sizes: [
          {
            height: 9999,
            path: '150_9999_100',
            quality: '',
            uniqueKey: 'qRyLiJ0wq',
            width: 150
          },
          {
            height: 9999,
            path: '300_9999_100',
            quality: 1,
            uniqueKey: 'TZXIrsqNr_',
            width: 300
          },
          {
            height: 9999,
            path: '480_9999_97',
            quality: '0.97',
            uniqueKey: 'YR6ZWOGue3',
            width: 480
          },
          {
            height: 9999,
            path: '720_9999_100',
            quality: '',
            uniqueKey: 'mKP-q0ySfU',
            width: 720
          },
          {
            height: 9999,
            path: '1024_9999_100',
            quality: 1,
            uniqueKey: '0-ekE8hl7Y',
            width: 1024
          },
          {
            height: 9999,
            path: '1920_9999_100',
            quality: 1,
            uniqueKey: 'HOZLtp2G0m',
            width: 1920
          }
        ],
        type: 'images'
      },
      '1531563226779': {
        __meta__: {
          createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          createdDate: '2018-07-14T10:13:50.504Z'
        },
        contentType: 'image/jpeg',
        file: '1531563226779_Valentinstag.jpg',
        folderId: 1527419518018,
        id: 1531563226779,
        sizes: [
          {
            height: 9999,
            path: '150_9999_100',
            quality: '',
            uniqueKey: 'qRyLiJ0wq',
            width: 150
          },
          {
            height: 9999,
            path: '300_9999_100',
            quality: 1,
            uniqueKey: 'TZXIrsqNr_',
            width: 300
          },
          {
            height: 9999,
            path: '480_9999_97',
            quality: '0.97',
            uniqueKey: 'YR6ZWOGue3',
            width: 480
          },
          {
            height: 9999,
            path: '720_9999_100',
            quality: '',
            uniqueKey: 'mKP-q0ySfU',
            width: 720
          },
          {
            height: 9999,
            path: '1024_9999_100',
            quality: 1,
            uniqueKey: '0-ekE8hl7Y',
            width: 1024
          },
          {
            height: 9999,
            path: '1920_9999_100',
            quality: 1,
            uniqueKey: 'HOZLtp2G0m',
            width: 1920
          }
        ],
        type: 'images'
      },
      '1531563236482': {
        __meta__: {
          createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          createdDate: '2018-07-14T10:14:02.179Z'
        },
        contentType: 'image/jpeg',
        file: '1531563236482_VaterTag.jpg',
        folderId: 1527419518018,
        id: 1531563236482,
        sizes: [
          {
            height: 9999,
            path: '150_9999_100',
            quality: '',
            uniqueKey: 'qRyLiJ0wq',
            width: 150
          },
          {
            height: 9999,
            path: '300_9999_100',
            quality: 1,
            uniqueKey: 'TZXIrsqNr_',
            width: 300
          },
          {
            height: 9999,
            path: '480_9999_97',
            quality: '0.97',
            uniqueKey: 'YR6ZWOGue3',
            width: 480
          },
          {
            height: 9999,
            path: '720_9999_100',
            quality: '',
            uniqueKey: 'mKP-q0ySfU',
            width: 720
          },
          {
            height: 9999,
            path: '1024_9999_100',
            quality: 1,
            uniqueKey: '0-ekE8hl7Y',
            width: 1024
          },
          {
            height: 9999,
            path: '1920_9999_100',
            quality: 1,
            uniqueKey: 'HOZLtp2G0m',
            width: 1920
          }
        ],
        type: 'images'
      },
      '1531563247073': {
        __meta__: {
          createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          createdDate: '2018-07-14T10:14:14.365Z'
        },
        contentType: 'image/jpeg',
        file: '1531563247073_Weihnachten.jpg',
        folderId: 1527419518018,
        id: 1531563247073,
        sizes: [
          {
            height: 9999,
            path: '150_9999_100',
            quality: '',
            uniqueKey: 'qRyLiJ0wq',
            width: 150
          },
          {
            height: 9999,
            path: '300_9999_100',
            quality: 1,
            uniqueKey: 'TZXIrsqNr_',
            width: 300
          },
          {
            height: 9999,
            path: '480_9999_97',
            quality: '0.97',
            uniqueKey: 'YR6ZWOGue3',
            width: 480
          },
          {
            height: 9999,
            path: '720_9999_100',
            quality: '',
            uniqueKey: 'mKP-q0ySfU',
            width: 720
          },
          {
            height: 9999,
            path: '1024_9999_100',
            quality: 1,
            uniqueKey: '0-ekE8hl7Y',
            width: 1024
          },
          {
            height: 9999,
            path: '1920_9999_100',
            quality: 1,
            uniqueKey: 'HOZLtp2G0m',
            width: 1920
          }
        ],
        type: 'images'
      },
      '1531563333298': {
        __meta__: {
          createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          createdDate: '2018-07-14T10:15:40.066Z'
        },
        contentType: 'image/png',
        file: '1531563333298_1527700339772_Startsite.png',
        folderId: 1527700250820,
        id: 1531563333298,
        sizes: [
          {
            height: 9999,
            path: '150_9999_100',
            quality: '',
            uniqueKey: 'qRyLiJ0wq',
            width: 150
          },
          {
            height: 9999,
            path: '300_9999_100',
            quality: 1,
            uniqueKey: 'TZXIrsqNr_',
            width: 300
          },
          {
            height: 9999,
            path: '480_9999_97',
            quality: '0.97',
            uniqueKey: 'YR6ZWOGue3',
            width: 480
          },
          {
            height: 9999,
            path: '720_9999_100',
            quality: '',
            uniqueKey: 'mKP-q0ySfU',
            width: 720
          },
          {
            height: 9999,
            path: '1024_9999_100',
            quality: 1,
            uniqueKey: '0-ekE8hl7Y',
            width: 1024
          },
          {
            height: 9999,
            path: '1920_9999_100',
            quality: 1,
            uniqueKey: 'HOZLtp2G0m',
            width: 1920
          }
        ],
        type: 'images'
      }
    },
    folders: {
      '1527417855487': {
        id: 1527417855487,
        name: 'Root',
        order: 0,
        parentId: 0
      },
      '1527419508703': {
        __meta__: {
          createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          createdDate: '2018-05-27T11:11:48.704Z',
          lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          lastModifiedDate: '2018-05-27T11:11:56.058Z'
        },
        id: 1527419508703,
        name: 'Products',
        order: 1,
        parentId: 1527417855487
      },
      '1527419518018': {
        __meta__: {
          createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          createdDate: '2018-05-27T11:11:58.019Z',
          lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          lastModifiedDate: '2018-05-27T11:12:05.523Z'
        },
        id: 1527419518018,
        name: 'Occasions',
        order: 2,
        parentId: 1527419508703
      },
      '1527700250820': {
        __meta__: {
          createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          createdDate: '2018-05-30T17:10:50.821Z',
          lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          lastModifiedDate: '2018-05-30T17:10:55.540Z'
        },
        id: 1527700250820,
        name: 'Startsite',
        order: 3,
        parentId: 0
      },
      '1528622302111': {
        __meta__: {
          createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          createdDate: '2018-06-10T09:18:22.111Z',
          lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          lastModifiedDate: '2018-06-10T09:18:27.980Z'
        },
        id: 1528622302111,
        name: 'SVG-Icons',
        order: 4,
        parentId: 0
      }
    }
  },
  permissions: {
    '1': {
      content: {
        development: {
          dataProtection: {
            create: true,
            delete: true,
            update: true,
            view: true
          },
          firstcategory: {
            create: true,
            delete: true,
            update: true,
            view: true
          },
          footer: {
            create: true,
            delete: true,
            update: true,
            view: true
          },
          occasion: {
            create: true,
            delete: true,
            update: true,
            view: true
          },
          products: {
            create: true,
            delete: true,
            update: true,
            view: true
          },
          secondcategory: {
            create: true,
            delete: true,
            update: true,
            view: true
          },
          startsite: {
            create: true,
            delete: true,
            update: true,
            view: true
          }
        },
        production: {
          anzel: {
            create: true,
            delete: true,
            update: true,
            view: true
          },
          dataProtection: {
            create: true,
            delete: true,
            update: true,
            view: true
          },
          firstcategory: {
            create: true,
            delete: true,
            update: true,
            view: true
          },
          footer: {
            create: true,
            delete: true,
            update: true,
            view: true
          },
          occasion: {
            create: true,
            delete: true,
            update: true,
            view: true
          },
          products: {
            create: true,
            delete: true,
            update: true,
            view: true
          },
          secondcategory: {
            create: true,
            delete: true,
            update: true,
            view: true
          },
          startsite: {
            create: true,
            delete: true,
            update: true,
            view: true
          }
        }
      },
      environments: {
        development: true,
        production: true
      },
      id: 1,
      media: {
        create: true,
        delete: true,
        update: true,
        view: true
      },
      name: 'Super Admin',
      navigation: {
        development: {
          create: true,
          delete: true,
          update: true,
          view: true
        },
        production: {
          create: true,
          delete: true,
          update: true,
          view: true
        }
      },
      permissions: {
        create: true,
        delete: true,
        update: true,
        view: true
      },
      schemas: {
        development: {
          create: true,
          delete: true,
          update: true,
          view: true
        },
        production: {
          create: true,
          delete: true,
          update: true,
          view: true
        }
      },
      settings: {
        backups: {
          create: true,
          delete: true,
          update: true,
          view: true
        },
        environments: {
          create: true,
          delete: true,
          update: true,
          view: true
        },
        general: {
          create: true,
          delete: true,
          update: true,
          view: true
        },
        globals: {
          create: true,
          delete: true,
          update: true,
          view: true
        },
        locales: {
          create: true,
          delete: true,
          update: true,
          view: true
        }
      },
      users: {
        create: true,
        delete: true,
        update: true,
        view: true
      }
    },
    '1527613656960': {
      __meta__: {
        createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
        createdDate: '2018-05-29T17:07:36.961Z',
        lastModifiedBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
        lastModifiedDate: '2019-01-29T12:01:52.721Z'
      },
      content: {
        development: {
          dataProtection: {
            create: true,
            delete: true,
            update: true,
            view: true
          },
          firstcategory: {
            create: true,
            delete: true,
            update: true,
            view: true
          },
          footer: {
            create: true,
            delete: true,
            update: true,
            view: true
          },
          occasion: {
            create: true,
            delete: true,
            update: true,
            view: true
          },
          production: {
            firstcategory: {
              create: false,
              delete: false,
              update: false,
              view: true
            },
            occasion: {
              create: false,
              delete: false,
              update: false,
              view: true
            },
            products: {
              create: false,
              delete: false,
              update: false,
              view: true
            },
            secondcategory: {
              create: false,
              delete: false,
              update: false,
              view: true
            },
            startsite: {
              create: false,
              delete: false,
              update: false,
              view: true
            }
          },
          products: {
            create: true,
            delete: true,
            update: true,
            view: true
          },
          secondcategory: {
            create: true,
            delete: true,
            update: true,
            view: true
          },
          startsite: {
            create: true,
            delete: true,
            update: true,
            view: true
          }
        }
      },
      environments: {
        development: true
      },
      id: 1527613656960,
      media: {
        create: true,
        delete: true,
        update: true,
        view: true
      },
      name: 'Guest',
      navigation: {
        development: {
          create: true,
          delete: true,
          update: true,
          view: true
        }
      },
      permissions: {
        create: true,
        delete: true,
        update: true,
        view: true
      },
      schemas: {
        development: {
          create: true,
          delete: true,
          production: {
            create: false,
            delete: false,
            update: false,
            view: false
          },
          update: true,
          view: true
        },
        production: {
          production: {
            create: false,
            delete: false,
            update: false,
            view: false
          }
        }
      },
      settings: {
        backups: {
          create: true,
          update: true,
          view: true
        },
        customLinks: {
          update: true,
          view: true
        },
        environments: {
          create: true,
          delete: true,
          production: true,
          update: true,
          view: true
        },
        general: {
          update: true,
          view: true
        },
        globals: {
          update: true,
          view: true
        },
        locales: {
          create: true,
          delete: true,
          view: true
        }
      },
      users: {
        create: true,
        update: true,
        view: true
      }
    }
  },
  settings: {
    backups: {
      '1548413391985': {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2019-01-25T10:49:51.985Z'
        },
        file: 'dreampresent-382c8-export.json',
        id: 1548413391985,
        timestamp: '2019-01-25 12:49:49'
      },
      '1548414447390': {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2019-01-25T11:07:27.391Z'
        },
        file: 'flamelink_something-something-4d942_2019_01_25_13_07_25.json',
        id: 1548414447390,
        timestamp: '2019-01-25 13:07:25'
      }
    },
    defaultLocale: 'en-US',
    environments: {
      development: {
        __meta__: {
          createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
          createdDate: '2018-09-26T16:32:31.765Z'
        },
        id: 'development',
        name: 'Development'
      },
      production: {
        id: 'production',
        name: 'Production'
      }
    },
    general: {
      __meta__: {
        createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
        createdDate: '2018-05-27T11:26:57.042Z',
        lastModifiedBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
        lastModifiedDate: '2018-07-14T09:58:25.612Z'
      },
      defaultPermissionsGroup: 1,
      id: 'general',
      imageSizes: getImageSizes()
    },
    globals: getGlobals('rtdb'),
    locales: {
      'en-US': {
        id: 'en-US',
        name: 'English (America)'
      }
    }
  },
  users: {
    '5BcXpIYMR3eRlvmiSMWsezQgL4f1': {
      __meta__: {
        createdBy: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
        createdDate: '2018-07-24T09:02:46.666Z'
      },
      email: 'Test.Test@test.com',
      enabled: 'Yes',
      firstName: 'Test',
      flamelink: 'No',
      id: '5BcXpIYMR3eRlvmiSMWsezQgL4f1',
      lastName: 'Test',
      permissions: 1527613656960
    },
    LKJcOW4CiwS8pijpqmhQcDl9TvX2: {
      displayName: 'JayPee Erasmus',
      email: 'jperasmus11@gmail.com',
      enabled: 'Yes',
      firstName: '',
      id: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
      lastName: '',
      permissions: 1
    },
    miWs1rZibFUAEFO40j7P8r9EBEB3: {
      email: 'jperasmus11@gmail.com',
      enabled: 'Yes',
      firstName: 'JP',
      flamelink: 'Yes',
      id: 'miWs1rZibFUAEFO40j7P8r9EBEB3',
      lastName: 'Erasmus',
      permissions: 1
    },
    mvSiGccPYHSfOzbwR8TdrJEDTRH3: {
      email: 'simonstone97@gmail.com',
      enabled: 'Yes',
      firstName: 'Simon',
      flamelink: 'Yes',
      id: 'mvSiGccPYHSfOzbwR8TdrJEDTRH3',
      lastName: 'Steinbeißer',
      permissions: 1
    }
  }
})
