export interface InfrastructureMethod {
    getAvatar: (charId: string) => string | undefined;
    getName: (charId: string) => string;
    getSkillIcon: (charId: string, skillIndex: number) => string;
    getSkillLevel: (charId: string, skillIndex: number) => number;
}

export interface InfrastructureRoomProps<T> {
    model: T;
    method: InfrastructureMethod;
}