# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

For loaders, look here: https://css-loaders.com/arcade/
For ui components: https://www.shadcn-vue.com/docs/installation/nuxt.html

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

salüüüü

**Tutorial**
**Schritt 1**
als ersts müemer lueg, dass Du
en [Entwickligsumgebig (IDE)](https://www.computerweekly.com/de/definition/Integrierte-Entwicklungsumgebung-IDE) hesch.
Do defür hesch zwei Optione

- [VSCode](https://code.visualstudio.com/) | Free | Hani nid viel erfahrig demit aber es isch basically
  industriestandard und sho huere geil (chasch easy customize).
- [Jet Brains PyCharm](https://www.jetbrains.com/pycharm/) | CHF €249.00 im erste Jahr | Han ich, isch viel geiler (find
  ich) und es funktioniert alles tiptop (basically Apple, VS Code isch Android). Wennd do Problem hesch, denn chani Dir
  au easy helfe. Wennd en .edu oder süscht en E-Mail vo enere Schuel / Uni / Bildigsinstitution hesch, denn isches
  GRATIS. Ab em Studim kostets dich denn eh nüd meh und spötistens denn würdi uf die IDE wechsle ;)

Chasch grundsätzlich wähle was du willsch. Es funktioniert beides Tiptop.

**Schritt 2**
Als nächsts müemmer luege, dass du es tool hesch, mit dem Du ganz eifach züg wie server, python, php, node, etc
installiere chasch.
Das Tool muess mer am beste über
d [Kommandoziile](https://www.davidbaumgold.com/tutorials/command-line/) ([Terminal PyCharm](https://www.jetbrains.com/help/pycharm/terminal-emulator.html), [Terminal VSCode](https://code.visualstudio.com/docs/terminal/basics))
benutze chönne.
Das Tool wo ich meine isch [brew](https://brew.sh/).
Das chasch Du ganz eifach installiere, indem Du im Terminal de folgendi Command ihgisch (ab jetzt bliibe mir erst mal in
de IDE):

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

*NOTE: in Webstorm chasch eifach mol es projekt ahlegge wo "test" heisst und denne dert dinne s Terminal bruche.*

**Schritt 3**
Als nächts muesch kurz prüefe, ob Du python installiert hesch. Do dezue gisch folgends ins Terminal ih:

python3 --version

Wenns do en Fehler git, denn müemmer das kurz zümme ahluege. Das SETTI THEORETISCH nid möglcih si.

**Schritt 4**
Jetzt chasch es Server-Framework installiere um chli mit Webentwicklig ahzfoh.
Als server nimmsch am beste [Flask](https://flask.palletsprojects.com/en/3.0.x/quickstart/). Das installiersch mit em
Command:

pip install Flask

Sobald Flask installiert isch erstellsch d Datei **application.py** und schriebsch folgendes dert ihne:

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
@app.route("/<name>")
def index(name=None):
    return render_template('index.html', name=name)
```

Jetzt fehlt no de visuelli Teil vo de Websiite. Do defür muesch no s
Template ([HTML](https://www.hostinger.com/tutorials/what-is-html)) erstelle.
Demit s Framework das automatisch erkennt,
muesch [d Datei im Ordner](https://www.jetbrains.com/guide/javascript/tips/create-new-file-folder/) **templates**
speichere.
D Datei nennsch **index.html**. Dert ihne schriebsch denn folgendes:

```python
<!doctype html>
<title>Hello from Flask</title>
{% if name %}
  <h1>Hello {{ name }}!</h1>
{% else %}
  <h1>Hello, World!</h1>
{% endif %}
```

Das alles chasch im [Tutorial vo Flask](https://flask.palletsprojects.com/en/3.0.x/quickstart/#static-files)
nocheläse :-)

**Schritt 5**
Jetzt wärs doch cool, wenn Du dini ersti chlini Websiite chönntsch über de Google Chrome (DONT USE SAFARI! Gwöhn dir das
besser gar nid erst ah) ufruefe.
Das settisch eigentlich ganz eifach im Terminal mache chönne:

flask run

Sobald derte kei Fehlermeldig gsehsch (falls scho -> google the errormessage or text me) chasch im
Chrome [http://localhost/](http://localhost/) öffne und denne dini Websiite beguetachte.
S coole an dem ganze isch, dass Du ganz eifach alles was Du do in dene HTML Dateie usw ihneschribsch uf en Server lade
chasch und im Internet zur Schau stelle chasch. Zuesätzlich hets de Vorteil, dass Du ganz eifach eppis ahpasse chasch
und denn direkt (ohni Server neu starte) im Chrome d Änderige ahluege chasch.

**Schritt 6**
Jetzt gohts wieder ans lerne, numme mit em Unterschied, dass s HTML züg us
em [Codedex Kurs](https://www.codedex.io/html) direkt usprobiere chasch :D

Falls Du irgendneume bi irgend eme Schritt problem hesch oder nümm wiiter weisch, denn meld dich eifach :) 