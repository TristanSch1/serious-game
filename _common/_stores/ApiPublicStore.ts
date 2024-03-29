import httpClient, { fetchUtils } from "../../_config/axios";
import { TFilter } from "../_types/filterTypes";
import { TObjWithId } from "../_types/baseType";
import { TFilesData } from "../_utils/fileUtils";
import { ApiStore } from "./ApiStore";
import { makeObservable } from "mobx";
import { appConfig } from "../../_config/config";

export abstract class ApiPublicStore<TResource extends TObjWithId> extends ApiStore<TResource> {
    protected constructor(protected serviceName: string) {
        super(serviceName);
        this.apiPath = `${appConfig.apiUrl}/${this.serviceName}`;
        makeObservable(this);
    }

    list(
        offset: number = 0,
        limit?: number,
        sort?: { [p: string]: number },
        filters?: TFilter[],
    ): Promise<{ count: number; items: TResource[] }> {
        const promise = httpClient
            .get<{ count: number; items: TResource[] }>(this.listEndPoint(offset, limit, sort, filters))
            .then(({ data: { count, items } }) => {
                this.setItems(items);
                return {
                    count,
                    items,
                };
            });
        return promise;
    }

    update(data: Partial<TResource>, files?: TFilesData): Promise<TResource | undefined> {
        const _data = files ? fetchUtils.createBodyWithFiles(data, files) : data;
        return httpClient.patch<TResource>(`${this.apiPath}/${data._id}`, _data, {}).then(({ data }) => data);
    }

    getEndPoint(): string {
        return `${this.apiPath}`;
    }
}
