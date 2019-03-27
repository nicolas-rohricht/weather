# Weather

Projeto Weather, criado como aplicativo teste para a DataInfo.

## Iniciando o projeto

Para rodar o projeto, criei um apk assinado por mim.
Basta baixar o arquivo weather.apk disponível na raiz principal da pasta e instalar em qualquer dispositivo Android. 
OBS: o apk está com o tamanho de aproximadamente 400mb, devido aos vídeos de background que rodam dependendo da condição do tempo fornecida pela API.

Os vídeos estão incluídos como arquivos puros .mp4 dentro do projeto.
Numa aplicação real (ou com mais tempo disponível para planejamento/desenvolvimento), o componente de vídeo utiliziaria uma URL para carregar o vídeo, vindo de uma API própria por exemplo, evitando o tamanho excessivo do apk.
Como foi um projeto de 3 dias, não pude focar em criar algum mecanismo com esse propósito.

## Executando os testes

1 - Ao abrir o aplicativo, no campo de pesquisa na tela inicial do projeto, digitar a cidade que se deseja saber a previsão do tempo.
2 - Ao clicar no botão de pesquisa, disponível no canto superior direito, o aplicativo irá trazer as informações de previsão do tempo para os próximos 5 dias, bem como seu detalhamento por hora do dia*.
3 - O usuário pode clicar sobre o dia e a hora desejada, e as informações daquele dia/hora serão mostradas no container geral de informações. (Como padrão, sempre a primeira hora do dia será carregada/selecionada como default).

* O Detalhamento por hora está disponível num intervalo de 3 em 3 horas.

## Dependências
- apsl-react-native-button
- lodash
- moment
- react-native-animatable
- react-native-vector-icons
- react-native-video

## Autores

* **Nícolas Michel Rohricht** - [Nicolas Rohricht](https://github.com/nicolas-rohricht)
