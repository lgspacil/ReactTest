/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
const MEMORY_KEY_PREFIX = '@StorageService:';
let dataMemory = {} as any;
/** @class */
export class StorageForAwsToken {
    private static syncPromise: Promise<void> | undefined;
    /**
     * This is used to set a specific item in storage
     * @param {string} key - the key for the item
     * @param {object} value - the value
     * @returns {string} value that was set
     */
    public static setItem(key: string, value: string): string {
        localStorage.setItem(MEMORY_KEY_PREFIX + key, value);
        dataMemory[key] = value;
        return dataMemory[key];
    }
    /**
     * This is used to get a specific key from storage
     * @param {string} key - the key for the item
     * This is used to clear the storage
     * @returns {string} the data item
     */
    public static getItem(key: string): string | undefined {
        return Object.prototype.hasOwnProperty.call(dataMemory, key) ? dataMemory[key] : undefined;
    }
    /**
     * This is used to remove an item from storage
     * @param {string} key - the key being set
     * @returns {string} value - value that was deleted
     */
    public static removeItem(key: string): string {
        localStorage.removeItem(MEMORY_KEY_PREFIX + key);
        const oldVal = dataMemory[key];
        delete dataMemory[key];
        return oldVal;
    }
    /**
     * This is used to clear the storage
     * @returns {string} nothing
     */
    public static clear(): object {
        dataMemory = {};
        return dataMemory;
    }
    /**
     * Will sync the MemoryStorage data from AsyncStorage to storageWindow MemoryStorage
     * @returns {void}
     */
    public static sync() {
        if (!StorageForAwsToken.syncPromise) {
            StorageForAwsToken.syncPromise = new Promise((res, rej) => {
                localStorage.getAllKeys((errKeys: any, keys: any[]) => {
                    if (errKeys) rej(errKeys);
                    const memoryKeys = keys ? keys.filter(key => key.startsWith(MEMORY_KEY_PREFIX)) : [];
                    localStorage.multiGet(memoryKeys, (err: any, stores: any[]) => {
                        if (err) rej(err);
                        stores?.map((result, index, store) => {
                            const key = store[index][0];
                            const value = store[index][1];
                            const memoryKey = key.replace(MEMORY_KEY_PREFIX, '');
                            dataMemory[memoryKey] = value;
                        });
                        res();
                    });
                });
            });
        }
        return StorageForAwsToken.syncPromise;
    }
}

function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}

/** @class */
export default class StorageHelper {
    private storageWindow: StorageForAwsToken;
    /**
     * This is used to get a storage object
     * @returns {object} the storage
     */
    constructor() {
        this.storageWindow = StorageForAwsToken;
    }
    /**
     * This is used to return the storage
     * @returns {object} the storage
     */
    public getStorage() {
        return this.storageWindow;
    }
}
