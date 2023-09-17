export async function getSubdomainPaths(domain: string) {
    return domain.split("/")[2];
}
