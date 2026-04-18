/** AuditID: DATA-001 | Definice formátů a kvalit */
export interface MediaOption {
  id: string;
  label: string;
  typ: 'audio' | 'video' | 'muxed';
  ext: 'mp3' | 'mp4' | 'm4a';
  kvalita: string;
}

export const KVALITY: MediaOption[] = [
  { id: 'a1', label: 'Audio HQ', typ: 'audio', ext: 'mp3', kvalita: '320kbps' },
  { id: 'v1', label: 'Video FHD', typ: 'video', ext: 'mp4', kvalita: '1080p' },
  { id: 'm1', label: 'Ultra 4K', typ: 'muxed', ext: 'mp4', kvalita: '2160p' }
];