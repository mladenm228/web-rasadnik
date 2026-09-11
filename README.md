Web Rasadnik 

Online prodavnica sobnog i bastenskog bilja, sukulenata, sadnica i pribora za negu.
Izradjeno u React-u i TypeScript-u, uz react-router-dom za rutiranje.

Pokretanje projekta

```bash
npm install
npm run dev
```

Aplikacija se pokrece na `http://localhost:5173`.

Za produkcijski build:

```bash
npm run build
```

Struktura projekta

```
src/
  components/   reusable komponente (Navbar, Footer, Button, FormField, PlantCard, SearchBar, StarRating, Toast, Layout, ProtectedRoute)
  pages/        stranice aplikacije (Home, Catalog, PlantDetail, Cart, Favorites, Contact, Login, About, NotFound)
  models/       interfejsi i klase (Plant, User, IStorageService, LocalStorageService, ShoppingCart, FormValidator)
  context/      React context provideri (CartContext, AuthContext, ThemeContext, NotificationContext)
  hooks/        custom hookovi (useFavorites, useDocumentTitle, useRecentlyViewed)
  data/         mock podaci kataloga (plants.ts)
```

Pregled funkcionalnosti

 Pretraga i filtriranje kataloga po nazivu i kategoriji, sortiranje po ceni/nazivu (uskladjeno sa URL parametrima preko `useSearchParams`)

 Korpa: dodavanje, izmena kolicine, uklanjanje stavki i izracunavanje ukupne cene (`ShoppingCart` klasa)

 Lista omiljenih biljaka sa perzistencijom u `localStorage` (zasticena ruta, dostupna samo prijavljenim korisnicima)

 Prijava sa validacijom forme i preusmeravanjem korisnika nazad na stranicu sa koje je dosao

 Kontakt forma sa validacijom (`FormValidator` klasa)

 "Nedavno pregledano" na stranici pojedinacne biljke

 Svetla/tamna tema sa perzistencijom

 Toast obavestenja pri dodavanju u korpu, prijavi i slanju poruke

Autori:

Mladen Milosavljevic
Vukasin Zivkovic
Njegos Stankovic
