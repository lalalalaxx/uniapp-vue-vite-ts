import { ref } from "vue";

// pick res.data.comment.userId by ['comment','userId']
function LoadAttributeByPath(obj : Object, path : string[]) {
	let now : any = obj;
	for (let i = 0; i < path.length; i++) {
		const attr = path[i];
		if (now.hasOwnProperty(attr))
			now = now[attr as keyof Object];
		else
			return undefined;
	}
	return now;
}

// define the option.
// can be extended like 'filter', or 'useSearch'
type PaginationOption<T> = {
	pageDataPath : string[],
	totalDataPath : string[],
	assembler ?: (rawRes : any) => T[]
}

// main logics
export class Pagination<T> {
	protected _pageData = ref([] as T[]);
	protected _currentPage = ref(1);
	protected _total = ref(0);
	size = 10;
	pageQuery : (current : number, size : number) => Promise<any>;
	option : PaginationOption<T> = {
		pageDataPath: [] as string[],
		totalDataPath: [] as string[],
	}

	get pageData() : T[] {
		return this._pageData.value as T[];
	}

	get currentPage() : number {
		return this._currentPage.value;
	}


	get total() : number {
		return this._total.value;
	}

	constructor(size : number,
		pageQuery : (current : number, size : number) => Promise<any>,
		option : {
			pageDataPath : string[],
			totalDataPath : string[],
			assembler ?: (rawRes : any) => T[]
		}) {
		this.size = size;
		this.pageQuery = pageQuery;
		this.option = option
	}

	// query data from backend
	loadPage = (newPage : number) => {
		this._currentPage.value = newPage;
		return this.pageQuery(this._currentPage.value, this.size).then(res => {
			if (this.option.assembler) {
				// the assembler in option is the first class with top priority
				(this._pageData.value as T[]) = this.option.assembler(res);
			} else {
				// find page data in response
				this._pageData.value = LoadAttributeByPath(res.data, this.option.pageDataPath) as typeof this._pageData.value;
			}
			// find total in response
			this._total.value = LoadAttributeByPath(res.data, this.option.totalDataPath) as number;
			// for further operations
			return Promise.resolve(res);
		}).catch(e => Promise.reject(e));
	}
}

export function usePagination<T>(size : number,
	pageQuery : (current : number, size : number) => Promise<any>,
	option : {
		pageDataPath : string[],
		totalDataPath : string[],
		assembler ?: (rawRes : any) => T[]
	}) {
	// keep the reactivity
	return { PageControl: new Pagination<T>(size, pageQuery, option) }
}