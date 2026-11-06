# DYNAMIC MOTION STUDIO 🎬

**Editor gratuito de motion graphics e vídeos dinâmicos**, feito com React, Remotion e GitHub Actions.

Versão 1: showreel cinematográfico vertical em **1080 × 1920, 60 FPS, 24 segundos**, com cinco cenas originais, trilha sintetizada em código e quatro estilos visuais. Sem chave de API ou assinatura de renderização.

## Abrir o editor online

GitHub Pages: https://gbcalerodoende-sudo.github.io/dynamic-motion-studio/

Primeira vez: vá em **Settings → Pages → Build and deployment → Source: GitHub Actions** no repositório e confirme. Depois abra **Actions → Publish Motion Studio** e clique em **Run workflow** se a publicação ainda não tiver ocorrido.

O editor é estático; as alterações são armazenadas no seu navegador, não modificam o repositório automaticamente.

## Recursos

- Cinco cenas com abertura cinematográfica, cartões em perspectiva 3D, gráficos animados, tipografia cinética e encerramento.
- Quatro paletas: Ultraviolet, Golden Hour, Electric Ice e Hot Ember.
- Campos editáveis de título, subtítulo, indicador, palavras dinâmicas, frase final e marca.
- Preview ao vivo, play, pause, timeline, música e atalhos de navegação por cena.
- Trilha de áudio original de 24 segundos, gerada matematicamente, sem samples de terceiros.
- Salvar rascunho no navegador, copiar JSON ou baixar configuração.
- Renderização MP4 H.264 no GitHub Actions, com download em Artifacts.

## Como renderizar um MP4

1. Abra o editor no GitHub Pages e personalize as cenas.
2. Vá à aba **Exportar** e clique em **Copiar JSON da edição**.
3. Abra **[Actions → Render Motion MP4](https://github.com/gbcalerodoende-sudo/dynamic-motion-studio/actions/workflows/render.yml)**.
4. Clique em **Run workflow**; cole o JSON no campo chamado props_json. Se não preencher, usa a demonstração padrão.
5. Em quality, selecione **full** para 1080 × 1920, 60 FPS e 24s; ou **preview** para primeiros 5 segundos reduzidos proporcionalmente para 540 × 960.
6. Após a execução ficar verde, abra-a e baixe o MP4 compactado como ZIP em **Artifacts**.

Ao enviar código novo para main, o workflow executa automaticamente apenas o preview curto. A renderização completa é manual para economizar minutos gratuitos. Os minutos e armazenamento do GitHub têm cotas; quando acabarem, o serviço pode parar até a renovação da cota ou exigir outra solução.

## Rodar no computador (opcional)

Precisa de Node.js 22 ou mais recente:

    git clone https://github.com/gbcalerodoende-sudo/dynamic-motion-studio.git
    cd dynamic-motion-studio
    npm install
    npm run dev

Outros comandos:

    npm run studio
    npm run render
    npm run render:preview
    npm run build
    npm run check:config

Para usar o arquivo exportado, passe o caminho do JSON personalizado ao argumento --props do Remotion.

## Arquitetura

| Arquivo | Papel |
|---|---|
| src/studio/StudioApp.tsx | Editor, Player, timeline, textos, paletas e exportação |
| src/studio/studio.css | Design responsivo |
| src/video/MotionFilm.tsx | Composição e áudio |
| src/video/scenes.tsx | Cinco cenas com animações |
| src/video/art.tsx | Elementos visuais reutilizáveis |
| src/video/config.ts | Configurações, temas e duração |
| video.config.json | Texto padrão do vídeo |
| scripts/generate-audio.mjs | Trilha original sem APIs |
| scripts/make-render-config.mjs | Valida dados para renderização |
| .github/workflows/render.yml | Gera MP4 e artifacts |
| .github/workflows/pages.yml | Publica GitHub Pages |
| .github/workflows/ci.yml | Validação TypeScript e build |

## Limitações

**Esta versão edita templates cinematográficos predefinidos**. Não é uma IA que gera qualquer cena a partir de um prompt, nem um editor completo multipista. Não gera narrações, não transcreve fala e não sincroniza legendas automaticamente. Essas seriam evoluções futuras.

O indicador porcentual é ilustrativo e não deve ser apresentado como uma estatística verificada sem fonte. As cenas são programadas com SVG/CSS 3D, não são modelos fotorrealistas renderizados em 3D.

Verifique os termos de licença do Remotion em https://www.remotion.dev/license em caso de uso empresarial. Este projeto não utiliza APIs pagas.

**O radar de memecoins e o jogo 3D estão em outros repositórios e não foram alterados.**
