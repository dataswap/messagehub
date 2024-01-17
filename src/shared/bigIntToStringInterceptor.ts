/*******************************************************************************
 *   (c) 2023 dataswap
 *
 *  Licensed under either the MIT License (the "MIT License") or the Apache License, Version 2.0
 *  (the "Apache License"). You may not use this file except in compliance with one of these
 *  licenses. You may obtain a copy of the MIT License at
 *
 *      https://opensource.org/licenses/MIT
 *
 *  Or the Apache License, Version 2.0 at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the MIT License or the Apache License for the specific language governing permissions and
 *  limitations under the respective licenses.
 ********************************************************************************/

import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from "@nestjs/common"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"

/**
 * Interceptor to convert BigInt values in response objects to strings.
 * Helps handle serialization issues related to BigInts in JSON.
 */
@Injectable()
export class BigIntToStringInterceptor implements NestInterceptor {
    /**
     * Intercepts the response and transforms BigInt values to strings.
     * @param context - The execution context.
     * @param next - The call handler.
     * @returns An Observable with the transformed response.
     */
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                // If the response data is an object, transform BigInt values
                if (data && typeof data === "object") {
                    this.transformBigIntToString(data)
                }
                return data
            })
        )
    }

    /**
     * Recursively transforms BigInt values in an object to strings.
     * @param data - The object to transform.
     */
    private transformBigIntToString(data: any) {
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                // If the value is a BigInt, convert it to string
                if (typeof data[key] === "bigint") {
                    data[key] = data[key].toString()
                }
                // If the value is an object, and not null, recursively check for BigInt values
                else if (typeof data[key] === "object" && data[key] !== null) {
                    this.transformBigIntToString(data[key])
                }
            }
        }
    }
}
