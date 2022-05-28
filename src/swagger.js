export default {
  openapi: "3.0.0",
  info: {
    title: "API Fazendo Arte",
    description: "API para CRUD de produtos da loja Fazendo Arte.",
    termsOfService: "",
    contact: {
      email: "dtfsprocopio@gmail.com",
    },
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000/aromatizador",
      description: "API de teste",
    },
    {
      url: "https://api-elgeladon-danmazda.onrender.com/aromatizador",
      description: "API de produção",
    },
  ],
  paths: {
    "aromatizador/all": {
      get: {
        summary: "Listar todos os aromatizadores.",
        description: "Lista todos os aromatizadores cadastrados na loja.",
        tags: ["Aromatizadores"],
        responses: {
          404: {
            description: "Sem aromatizadores na base de dados",
          },
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schema/Aromatizadores",
                  },
                },
              },
            },
          },
        },
      },
    },
    "aromatizador/create": {
      post: {
        summary: "Criar um aromatizador",
        description: "Cria um aromatizador para ser adicionado à loja.",
        tags: ["Aromatizadores"],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schema/Aromatizadores",
              },
              examples: {
                Aromatizadores: {
                  value: {
                    fragrance: "lavanda",
                    description: "aromatizador de lavanda",
                    image: "./assets/image/lavanda.jpg",
                    price: 10,
                  },
                },
              },
            },
          },
        },
        responses: {
          400: {
            description: "Atributos faltando.",
          },
          201: {
            description: "Created.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  $ref: "#/components/schema/Aromatizadores",
                },
              },
            },
          },
        },
      },
    },
    "aromatizador/id/{id}": {
      get: {
        summary: "Mostrar um aromatizador",
        description: "Mostrar um aromatizador de um id específico.",
        tags: ["Aromatizadores"],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Id do aromatizador a ser pesquisado",
            required: true,
          },
        ],
        responses: {
          422: {
            description: "Id inválida!",
          },
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  $ref: "#/components/schema/Aromatizadores",
                },
              },
            },
          },
        },
      },
    },
    "aromatizador/update/{id}": {
      put: {
        summary: "Atualizar um aromatizador.",
        description: "Atualiza um aromatizador já existente na loja.",
        tags: ["Aromatizadores"],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Id do aromatizador a ser atualizado",
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schema/Aromatizadores",
              },
              examples: {
                Aromatizadores: {
                  value: {
                    fragrance: "lavanda",
                    description: "aromatizador de lavanda",
                    image: "./assets/image/lavanda.jpg",
                    price: 10,
                  },
                },
              },
            },
          },
        },
        responses: {
          400: {
            description: "Atributos faltando.",
          },
          422: {
            description: "Id Inválida!",
          },
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
    "aromatizador/delete/{id}": {
      delete: {
        summary: "Deletar um aromatizador.",
        description:
          "Deletar um aromatizador já existente na loja, a partir do Id.",
        tags: ["Aromatizadores"],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Id do aromatizador a ser atualizado",
            required: true,
          },
        ],
        responses: {
          422: {
            description: "Id Inválida!",
          },
          404: {
            description: "Id não encontrado!",
          },
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schema: {
      Aromatizadores: {
        type: "object",
        properties: {
          fragrance: {
            type: "string",
          },
          description: {
            type: "string",
          },
          image: {
            type: "string",
          },
          price: {
            type: "number",
          },
        },
      },
    },
  },
};
