import { A_EXPRESS_App } from "../../../../index";


export class SimpleServerApp extends A_EXPRESS_App {

    protected async beforeStart(): Promise<void> {
        this.Logger.log('Server is starting');
    }
} 