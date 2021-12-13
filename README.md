# lecteurs 📚

<a>
  <img align="center"  height='150px' src="logo.svg" />
</a>

O Lecteurs é uma aplicação web que imita uma rede social para leitores compartilharem suas reviews sobre livros que leram. 

## Funcionalidades

* Cadastro de usuários
* Autenticação de usuários
* Compartilhamento de review com titulo, texto, nota e imagem
* Atribuição de nota a um livro (Apenas usuário logado)
* Curtidas e comentários (Apenas usuários com cadastro)
* Visualização de perfil (Qualquer usuário)
* Feed para compartilhamento das reviews 
* Filtrar por nota 
* Buscar por título ou autor

## Telas

* Tela inicial (Feed): Formada por cards clicaveis que representam uma review com titulo, texto (Resumo de 200 caracteres), nota e imagem e usário que a publicou. Além disso, a tela de feed irá ter um filtro por nota e uma barra de busca (autor ou livro)
* Modal: Cada card do feed abre um modal que apresenta o texto completo junto a lista de comentários que aquela review possui. Um usuário logado pode comentar ou curtir a review, e o usuário dono da review pode editar ou exclui-la.
* Tela de Login/Cadastro: Ao clicar no botão no header um usuário entra em uma página para logar ou criar um cadastro no lectures. 
* Tela de postagem: Tela com um form, na qual um usuário logado pode postar suas reviews no feed
* Tela de Perfil: Tela com infomações básicas do usuário junto a uma lista de reviews que ele postou no feed
