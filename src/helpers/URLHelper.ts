import { RouteEnum } from '../constants/RouteEnum'

interface PlainObject {
    [key: string]: any
}

export const getPath = (path: RouteEnum, pathParams?: PlainObject) => {
    let pathToGo = path.toString()

    if (pathParams) {
        Object.keys(pathParams).forEach((param) => {
            pathToGo = pathToGo.replace(`:${param}`, pathParams[param])
        })
    }

    return pathToGo
}
