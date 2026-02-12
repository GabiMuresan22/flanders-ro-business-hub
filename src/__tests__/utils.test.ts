import { textToHtml } from '../lib/utils';

describe('textToHtml', () => {
  it('converts numbered sections to h2 headers', () => {
    const input = '1. First Section\n\nSome content here.';
    const output = textToHtml(input);
    expect(output).toContain('<h2>First Section</h2>');
    expect(output).toContain('<p>Some content here.</p>');
  });

  it('converts lettered subsections to h3 headers', () => {
    const input = 'A. First Subsection\n\nSome content here.';
    const output = textToHtml(input);
    expect(output).toContain('<h3>First Subsection</h3>');
    expect(output).toContain('<p>Some content here.</p>');
  });

  it('handles multiple paragraphs', () => {
    const input = 'First paragraph.\n\nSecond paragraph.\n\nThird paragraph.';
    const output = textToHtml(input);
    expect(output).toContain('<p>First paragraph.</p>');
    expect(output).toContain('<p>Second paragraph.</p>');
    expect(output).toContain('<p>Third paragraph.</p>');
  });

  it('converts single newlines to br tags within paragraphs', () => {
    const input = 'Line one\nLine two\nLine three';
    const output = textToHtml(input);
    expect(output).toContain('Line one<br>Line two<br>Line three');
  });

  it('handles empty or null input', () => {
    expect(textToHtml('')).toBe('');
    expect(textToHtml(null as any)).toBe('');
    expect(textToHtml(undefined as any)).toBe('');
  });

  it('converts text with colons to h3 headers', () => {
    const input = 'Important Note:\n\nSome important information.';
    const output = textToHtml(input);
    expect(output).toContain('<h3>Important Note</h3>');
  });

  it('handles complex Dutch resource content', () => {
    const input = '1. Soorten zelfstandigheid: Hoofdberoep vs. Bijberoep\n\nIn België heb je twee hoofdopties.\n\nA. Professionele bankrekening\n\nOpen voor alles een aparte bankrekening.';
    const output = textToHtml(input);
    expect(output).toContain('<h2>Soorten zelfstandigheid: Hoofdberoep vs. Bijberoep</h2>');
    expect(output).toContain('<p>In België heb je twee hoofdopties.</p>');
    expect(output).toContain('<h3>Professionele bankrekening</h3>');
    expect(output).toContain('<p>Open voor alles een aparte bankrekening.</p>');
  });
});
