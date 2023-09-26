import request, {gql} from "graphql-request"

export const getCarsList = async() => {
  const query=gql`
    query CarLists {
      carLists {
        carAvg
        id
        name
        price
        publishedAt
        updatedAt
        createdAt
        seat
        image {
          url
        }
        carType
        carBrand
      }
    }
  `
  const result = await request('https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clmzx8gld00mm01ug0hjs2njs/master', query)
  return result;
}

