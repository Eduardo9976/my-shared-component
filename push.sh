#!/bin/bash

# Script para push automático baseado na branch
# Uso: ./push.sh [commit_message]

current_branch=$(git branch --show-current)
commit_message=${1:-"Update from $current_branch branch"}

echo "🌿 Branch atual: $current_branch"
echo "📝 Commit message: $commit_message"

# Adicionar todas as mudanças
git add .

# Fazer commit
git commit -m "$commit_message"

# Push baseado na branch
if [ "$current_branch" = "development" ]; then
    echo "🚀 Fazendo push para GitHub (development branch)"
    git push github development
elif [ "$current_branch" = "develop" ]; then
    echo "🚀 Fazendo push para GitLab (develop branch)"
    git push gitlab develop
else
    echo "❌ Branch não configurada para push automático"
    echo "Branches configuradas: development (GitHub) e develop (GitLab)"
    exit 1
fi

echo "✅ Push concluído com sucesso!"
