<p align="center">
  <img height="200" src="https://github.com/fernando8alvarez/My-PI-Food/blob/main/client/src/components/image/Logo.png" />
</p>

## De que trata la app

Se trata de una pequeña aplicación en la que las personas pueden buscar alguna receta saludable de comida la cual quiera cocinar o preparar, en ella podrar filtrar la busqueda ya sea por nombre, tipo de dieta, nivel de salud, asi como también se podra ordenar las recetas alfabeticamente o por nivel de salud para una mejor busqueda, por otro lado al darle click alguna receta, en ella podra ver más detalles de la misma, asi como un resumen, los tipos de dietas asociados, y lo pasos a seguir para su realización. Por último podrá registra una receta a traves de un formulario para postearlo en la página.

## Tecnologías usadas

- `ReactJS` 
- `Redux`
- `CSS3-Modules` 
- `NodeJS`
- `Express`
- `Sequelize` 
- `PostgreSQL` 
- `Api Food de spoonacular` 

## Vista previa de la app

- **Landing page:** carta de presentación y logo de la aplicación.

<img src="https://github.com/fernando8alvarez/My-PI-Food/blob/main/landingpage-food.png" />

- **Loading:** para que el usuario sepa que se esta cargando la información.

<img src="https://github.com/fernando8alvarez/My-PI-Food/blob/main/1667960726467.png" />

- **Home:** parte central de la app donde se muestran los distintos tipos de recetas, la barra de busqueda, filtros y el control del paginado.

<img src="https://github.com/fernando8alvarez/My-PI-Food/blob/main/1667960536516.png" />

- **Filtros:** muestra del filtrado por nivel de salud de la receta, notemos que las recetas tienen un nivel 2 de salud.

<img src="https://github.com/fernando8alvarez/My-PI-Food/blob/main/1667960582617.png" />

- **Detalle receta:** muestra informacion mas detallada de la receta, como un resumen de la misma, ingredientes, tipo de dieta asociada, nivel de salud y pasos a eguir para su elaboración.

<img src="https://github.com/fernando8alvarez/My-PI-Food/blob/main/1667962750560.png" />

- **Formulario:** formulario para la creación y publicación de una receta

<img src="https://github.com/fernando8alvarez/My-PI-Food/blob/main/formulario.png" />



```env
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

Adicionalmente será necesario que creen desde psql una base de datos llamada `food`

El contenido de `client` fue creado usando: Create React App.

## Enunciado

La idea general es crear una aplicación en la cual se puedan ver distintas recetas de comida junto con información relevante de las mismas utilizando la api externa [spoonacular](https://spoonacular.com/food-api) y a partir de ella poder, entre otras cosas:



