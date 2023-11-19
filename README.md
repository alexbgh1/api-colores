# Preview

![Foto index.html](https://i.imgur.com/d9pRnKi.png)

## Ejemplos de request

**Solicitar un color (placeholder) como imágen.**

```py
/api/100
Expected content-type: image/jpeg
```

![ejemplo-1](https://i.imgur.com/CPilpgJ.png)

**Solicitar un color (placeholder) en formato json.**

```py
/api/100?json=true
Expected content-type: application/json;
```

![ejemplo-2](https://i.imgur.com/42ggNRj.png)

**Solicitar un color como imágen sin texto.**

```py
/api/250/aaffaa?text=+
Expected content-type: image/jpeg
```

![ejemplo-3](https://i.imgur.com/Gvd6xsz.png)

## Inicializar el programa

```bash
npm install
npm run dev
```

## Inicializar test cases

```bash
npm run test
```

## TODO:

- [ ] Añadir más colorSpaces del color.
- [ ] Añadir test cases.
