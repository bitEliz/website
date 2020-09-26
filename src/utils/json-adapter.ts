import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";

export namespace JSONAdapter {
    export function modelOfClass<T>(className: ClassType<T>, fromJSONDictionary: Object): T {
        return plainToClass(className, fromJSONDictionary)
    }

    export function modelsOfClass<T>(className: ClassType<T>, fromJSONArray: Array<object>): Array<T> {
        return plainToClass(className, fromJSONArray)
    }
}
