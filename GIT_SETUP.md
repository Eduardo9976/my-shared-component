# 🚀 Configuração de Repositórios Duplos

Este projeto está configurado para usar **2 repositórios remotos** com branches específicas.

## 📍 **Repositórios Configurados:**

| Branch | Repositório | URL |
|--------|-------------|-----|
| **`development`** | **GitHub** | `https://github.com/Eduardo9976/my-shared-component.git` |
| **`develop`** | **GitLab** | `ssh://git@ssh.gitlab.miisy.me:29420/meweb/hipster/header.git` |

## 🔧 **Como usar:**

### **1. Para trabalhar na branch development (GitHub):**
```bash
git checkout development
# Faça suas alterações
./push.sh "Sua mensagem de commit"
# Ou com ticket Jira específico:
./push.sh MW-12345 "Sua mensagem de commit"
```

### **2. Para trabalhar na branch develop (GitLab):**
```bash
git checkout develop
# Faça suas alterações
./push.sh "Sua mensagem de commit"
# Ou com ticket Jira específico:
./push.sh MW-12345 "Sua mensagem de commit"
```

### **3. Push manual (alternativo):**
```bash
# Branch development -> GitHub
git push github development

# Branch develop -> GitLab
git push gitlab develop
```

## 📋 **Comandos úteis:**

```bash
# Ver repositórios configurados
git remote -v

# Ver branch atual
git branch --show-current

# Ver todas as branches
git branch -a

# Mudar de branch
git checkout development
git checkout develop
```

## ⚠️ **Importante:**

- **Branch `development`** sempre vai para **GitHub**
- **Branch `develop`** sempre vai para **GitLab**
- Use o script `./push.sh` para push automático
- O script detecta automaticamente a branch e faz push para o repositório correto
- **Padrão de commits:** `MW-00000 - feat: descrição` (padrão Jira)

## 🆘 **Solução de problemas:**

Se o push falhar, verifique:
1. Se está na branch correta
2. Se tem acesso aos repositórios
3. Se as chaves SSH estão configuradas (para GitLab)
4. Se o token de acesso está configurado (para GitHub)
