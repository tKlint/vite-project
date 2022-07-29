export interface ModuleElemnet {
    (): Promise<{
        default: React.FC<Record<string, unknown>>;
    }>;
}
