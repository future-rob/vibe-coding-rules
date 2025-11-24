// Enhanced markdown parser for rendering guide content
function parseMarkdown(markdown) {
    if (!markdown) return '';
    
    let html = markdown;
    
    // Code blocks (must be processed before inline code)
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const escaped = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        return `<pre><code>${escaped}</code></pre>`;
    });
    
    // Headers (process from h6 to h1 to avoid conflicts)
    html = html.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
    html = html.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Horizontal rules
    html = html.replace(/^---$/gim, '<hr>');
    html = html.replace(/^\*\*\*$/gim, '<hr>');
    
    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
    
    // Lists - ordered
    html = html.replace(/^(\d+)\.\s+(.*$)/gim, '<li>$2</li>');
    
    // Lists - unordered
    html = html.replace(/^[-*+]\s+(.*$)/gim, '<li>$1</li>');
    
    // Wrap consecutive list items
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
        // Check if it's an ordered list (contains numbers)
        const isOrdered = /^\d+\./.test(match);
        const tag = isOrdered ? 'ol' : 'ul';
        return `<${tag}>${match}</${tag}>`;
    });
    
    // Bold (must be before italic to avoid conflicts)
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');
    
    // Inline code (after bold/italic to avoid conflicts)
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
    
    // Split into blocks (double newlines)
    const blocks = html.split(/\n\n+/);
    html = blocks.map(block => {
        block = block.trim();
        if (!block) return '';
        
        // Don't wrap block elements
        if (/^<(h[1-6]|pre|ul|ol|blockquote|hr|div)/i.test(block)) {
            return block;
        }
        
        // Convert single newlines to <br> within paragraphs
        block = block.replace(/\n/g, '<br>');
        
        return `<p>${block}</p>`;
    }).join('\n');
    
    // Clean up empty paragraphs and fix nested paragraphs
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<[^>]+>)<\/p>/g, '$1');
    
    return html;
}

// Load and render stacks
async function loadStacks() {
    const stacksGrid = document.getElementById('stacksGrid');
    stacksGrid.innerHTML = '<div class="loading">Loading stacks</div>';
    
    try {
        const response = await fetch('data/guides.json');
        if (!response.ok) {
            throw new Error('Failed to load guides data');
        }
        
        const data = await response.json();
        renderStacks(data.stacks);
    } catch (error) {
        console.error('Error loading stacks:', error);
        stacksGrid.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--color-danger); font-family: var(--font-mono);">
                <p>Failed to load guides. Please ensure guides.json exists in the data directory.</p>
                <p style="font-size: 0.75rem; margin-top: 0.5rem; color: var(--color-text-light); text-transform: uppercase; letter-spacing: 0.1em;">Run: <code style="background: rgba(255, 68, 68, 0.1); border: 1px solid var(--color-danger); padding: 0.2em 0.4em; border-radius: 0.25rem;">npm run build</code></p>
            </div>
        `;
    }
}

function renderStacks(stacks) {
    const stacksGrid = document.getElementById('stacksGrid');
    
    stacksGrid.innerHTML = stacks.map(stack => {
        const guidesCount = stack.guides.length;
        const alwaysApplyCount = stack.guides.filter(g => g.alwaysApply).length;
        
        const guidesList = stack.guides.slice(0, 6).map(guide => {
            const alwaysApplyBadge = guide.alwaysApply 
                ? '<span style="color: var(--color-success); font-size: 0.7rem;">✓</span> ' 
                : '';
            return `<a href="#" class="guide-item ${guide.alwaysApply ? 'always-apply' : ''}" 
                       data-stack="${stack.id}" 
                       data-guide="${guide.id}">
                       ${alwaysApplyBadge}${guide.title}
                   </a>`;
        }).join('');
        
        const moreGuides = guidesCount > 6 
            ? `<div style="text-align: center; margin-top: 0.5rem;">
                 <button class="guide-item" style="width: 100%;" onclick="showAllGuides('${stack.id}')">
                   +${guidesCount - 6} more guides
                 </button>
               </div>`
            : '';
        
        return `
            <div class="stack-card" data-stack="${stack.id}">
                <div class="stack-header">
                    <div class="stack-icon">${stack.icon}</div>
                    <h3 class="stack-title">${stack.name}</h3>
                </div>
                <p class="stack-summary">${stack.summary}</p>
                <p class="stack-focus">Focus: ${stack.focus}</p>
                <div class="stack-stats">
                    <div class="stack-stat">
                        <span>📚</span>
                        <span>${guidesCount} guides</span>
                    </div>
                    <div class="stack-stat">
                        <span>✅</span>
                        <span>${alwaysApplyCount} auto-apply</span>
                    </div>
                </div>
                <div class="guides-list">
                    <h4>Key Guidelines</h4>
                    <div class="guides-grid">
                        ${guidesList}
                    </div>
                    ${moreGuides}
                </div>
            </div>
        `;
    }).join('');
    
    // Add click handlers
    document.querySelectorAll('.stack-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.guide-item')) return;
            const stackId = card.dataset.stack;
            showStackOverview(stackId);
        });
    });
    
    document.querySelectorAll('.guide-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const stackId = item.dataset.stack;
            const guideId = item.dataset.guide;
            if (stackId && guideId) {
                showGuide(stackId, guideId);
            }
        });
    });
}

function showStackOverview(stackId) {
    const data = window.guidesData;
    if (!data) return;
    
    const stack = data.stacks.find(s => s.id === stackId);
    if (!stack) return;
    
    const modal = document.getElementById('guideModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = `${stack.icon} ${stack.name}`;
    
    let content = `<div style="margin-bottom: 1.5rem;">`;
    content += `<p style="font-size: 0.95rem; color: var(--color-text-light); margin-bottom: 1rem; font-weight: 300; line-height: 1.6;">${stack.summary}</p>`;
    content += `<p style="font-size: 0.75rem; color: var(--color-primary); font-family: var(--font-mono); letter-spacing: 0.05em; text-transform: uppercase; padding: 0.25rem 0.5rem; border: 1px solid var(--color-primary); display: inline-block; border-radius: 0.25rem; background: rgba(0, 255, 209, 0.05);"><strong>Focus:</strong> ${stack.focus}</p>`;
    content += `</div>`;
    
    if (stack.readme) {
        content += `<div style="margin-top: 2rem;">`;
        content += parseMarkdown(stack.readme);
        content += `</div>`;
    }
    
    content += `<div style="margin-top: 2rem;">`;
    content += `<h3>All Guidelines (${stack.guides.length})</h3>`;
    content += `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.25rem; margin-top: 1rem;">`;
    
    stack.guides.forEach(guide => {
        const alwaysApplyBadge = guide.alwaysApply 
            ? '<span style="color: var(--color-success); font-size: 0.7rem;">✓</span> ' 
            : '';
        content += `<a href="#" class="guide-item ${guide.alwaysApply ? 'always-apply' : ''}" 
                       onclick="showGuide('${stackId}', '${guide.id}'); return false;">
                       ${alwaysApplyBadge}${guide.title}
                   </a>`;
    });
    
    content += `</div></div>`;
    
    modalContent.innerHTML = content;
    modal.classList.add('active');
}

function showAllGuides(stackId) {
    showStackOverview(stackId);
}

function showGuide(stackId, guideId) {
    const data = window.guidesData;
    if (!data) return;
    
    const stack = data.stacks.find(s => s.id === stackId);
    if (!stack) return;
    
    const guide = stack.guides.find(g => g.id === guideId);
    if (!guide) return;
    
    const modal = document.getElementById('guideModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = `${stack.icon} ${guide.title}`;
    
    let content = '';
    
    if (guide.frontmatter.description) {
        content += `<p style="font-size: 0.95rem; color: var(--color-text-light); margin-bottom: 1.5rem; font-style: italic; font-weight: 300; line-height: 1.6;">${guide.frontmatter.description}</p>`;
    }
    
    if (guide.alwaysApply) {
        content += `<div style="background: rgba(0, 255, 136, 0.05); padding: 0.75rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem; border-left: 2px solid var(--color-success); border: 1px solid rgba(0, 255, 136, 0.2);">`;
        content += `<strong style="color: var(--color-success); font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.05em; text-transform: uppercase;">✓ Auto-Applied:</strong> <span style="font-size: 0.875rem; color: var(--color-text-light);">This rule is automatically applied to all AI interactions.</span>`;
        content += `</div>`;
    }
    
    if (guide.globs && guide.globs.length > 0) {
        content += `<div style="background: var(--color-bg-alt); padding: 0.75rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem; border: 1px solid var(--color-border);">`;
        content += `<strong style="font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.05em; text-transform: uppercase; color: var(--color-text);">Applies to:</strong> <code style="background: rgba(0, 255, 209, 0.1); border: 1px solid rgba(0, 255, 209, 0.2); padding: 0.2em 0.4em; border-radius: 0.25rem; color: var(--color-primary-light); font-size: 0.8rem;">${guide.globs.join(', ')}</code>`;
        content += `</div>`;
    }
    
    content += parseMarkdown(guide.content);
    
    modalContent.innerHTML = content;
    modal.classList.add('active');
}

// Modal close handlers
document.getElementById('modalClose').addEventListener('click', () => {
    document.getElementById('guideModal').classList.remove('active');
});

document.getElementById('guideModal').addEventListener('click', (e) => {
    if (e.target.id === 'guideModal') {
        document.getElementById('guideModal').classList.remove('active');
    }
});

// Load data and initialize
async function init() {
    try {
        const response = await fetch('data/guides.json');
        if (response.ok) {
            window.guidesData = await response.json();
        }
    } catch (error) {
        console.error('Error loading guides data:', error);
    }
    
    loadStacks();
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

